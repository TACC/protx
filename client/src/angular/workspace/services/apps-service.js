import _ from 'underscore';

class Apps {
    constructor($http, $q, $translate) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
        this.$translate = $translate;
    }

    list(query) {
        return this.$http({
            url: '/api/workspace/meta',
            method: 'GET',
            params: { q: query },
            cache: true,
        });
    }

    get(app_id) {
        return this.$http({
            url: '/api/workspace/apps',
            method: 'GET',
            params: { app_id: app_id },
        });
    }

    getMeta(app_id) {
        return this.$http({
            url: '/api/workspace/meta',
            method: 'GET',
            params: { app_id: app_id },
        });
    }

    getPublic() {
        return this.$http({
            url: '/api/workspace/apps',
            method: 'GET',
            params: { publicOnly: true },
        });
    }

    getDateString() {
        let result = new Date().toISOString();
        return result.slice(0, result.indexOf('.'));
    }

    formSchema(app) {
    /**
     * Generate a JSON.schema for the app ready for angular-schema-form
     * https://github.com/json-schema-form/angular-schema-form
     */
        let params = app.parameters || [],
            inputs = app.inputs || [],
            schema = {
                type: 'object',
                properties: {},
            };

        if (params.length > 0) {
            schema.properties.parameters = {
                type: 'object',
                properties: {},
            };
            _.each(params, (param) => {
                if (!param.value.visible || param.id.startsWith('_')) {
                    return;
                }
                try {
                    RegExp(param.value.validator);
                } catch (e) {
                    param.value.validator = null;
                }
                let field = {
                    title: param.details.label,
                    description: param.details.description,
                    required: param.value.required,
                    default: param.value.default,
                    pattern: param.value.validator || undefined,
                };
                switch (param.value.type) {
                    case 'bool':
                    case 'flag':
                        field.type = 'boolean';
                        break;

                    case 'enumeration':
                        field.type = 'string';
                        field.enum = _.map(param.value.enum_values, function(enumVal) {
                            return Object.keys(enumVal)[0];
                        });
                        field['x-schema-form'] = {
                            titleMap: _.map(param.value.enum_values, function(enumVal) {
                                let key = Object.keys(enumVal)[0];
                                return {
                                    value: key,
                                    name: enumVal[key],
                                };
                            }),
                        };
                        break;

                    case 'number':
                        field.type = 'number';
                        break;

                    case 'string':
                        field.type = 'string';
                        if (('ontology' in param.semantics) && (param.semantics.ontology.includes('agaveFile'))) {
                            field.format = 'agaveFile';
                        }
                        break;
                    default:
                        field.type = 'string';
                }
                schema.properties.parameters.properties[param.id] = field;
            });
        }

        if (inputs.length > 0) {
            schema.properties.inputs = {
                type: 'object',
                properties: {},
            };
            _.each(inputs, (input) => {
                if (input.id.startsWith('_') || !input.value.visible) {
                    return;
                }
                try {
                    RegExp(input.value.validator);
                } catch (e) {
                    input.value.validator = null;
                }
                let field = {
                    title: input.details.label,
                    description: input.details.description,
                    id: input.id,
                    default: input.value.default,
                    pattern: input.value.validator || undefined,
                };
                if (input.semantics.maxCardinality === 1) {
                    field.type = 'string';
                    field.format = 'agaveFile';
                    field.required = input.value.required;
                } else {
                    field.type = 'array';
                    field.items = {
                        type: 'string',
                        format: 'agaveFile',
                        required: input.value.required,
                        'x-schema-form': { notitle: true },
                        title: input.details.label,
                        description: input.details.description,
                        pattern: input.value.validator || undefined,
                    };
                    if (input.semantics.maxCardinality > 1) {
                        field.maxItems = input.semantics.maxCardinality;
                    }
                }
                schema.properties.inputs.properties[input.id] = field;
            });
        }

        function replaceAt(str, i, replace) {
            return str.slice(0, i) + replace + str.slice(i + 1);
        }

        /**
         * Create regex pattern for maxRunTime
         * @function
         * @param {String} maxRunTime - maxRunTime given in the format of hh:mm:ss, usually from the target queue's maxRequestedTime
         * Creates a multigrouped regex to accommodate several layers of timestamps.
         */
        function createMaxRunTimeRegex(maxRunTime) {
            let timeStr = maxRunTime.replace(/:/g, '');
            let tmp = '[0-0][0-0]:[0-0][0-0]:[0-0][0-0]$'; // procedurally populated max value regex
            const regBase = '[0-4][0-9]:[0-5][0-9]:[0-5][0-9]$'; // default max values

            let regStr = '^'; // procedurally generated regex string to be returned

            let index = 3;

            // iterate through each value in the maxRunTime to generate a regex group
            timeStr.split('').forEach((n, i, arr) => {

                // only need to generate regex for nonzero values
                if (n > 0) {
                    if ((arr.length - 1) !== i) {
                        tmp = replaceAt(tmp, index, n - 1);
                        if (regStr !== '^') {
                            regStr += '|^';
                        }
                        regStr += tmp.slice(0, index + 1) + regBase.slice(index + 1);
                    }

                    tmp = replaceAt(tmp, index, n);
                    if ((arr.length - 1) === i || (arr[i + 1] == 0)) {
                        if (regStr !== '^') {
                            regStr += '|^';
                        }
                        regStr += tmp;
                    }
                }

                index += (i % 2 == 0) ? 5 : 6;
            });
            return regStr;
        }

        let maxQueueRunTime = app.defaultQueue ? app.exec_sys.queues.find((q) => q.name === app.defaultQueue).maxRequestedTime : app.exec_sys.queues.find((q) => q.default === true).maxRequestedTime;

        schema.properties.maxRunTime = {
            default: app.defaultMaxRunTime || null,
            title: 'Maximum job runtime',
            description: `In HH:MM:SS format. The maximum time you expect this job to run for. After this amount of time your job will be killed by the job scheduler. Shorter run times result in shorter queue wait times. Maximum possible time is ${maxQueueRunTime} (hrs:min:sec).`,
            type: 'string',
            pattern: createMaxRunTimeRegex(maxQueueRunTime),
            validationMessage: `Must be in format HH:MM:SS and be less than ${maxQueueRunTime} (hrs:min:sec).`,
            required: true,
            'x-schema-form': { placeholder: app.defaultMaxRunTime || maxQueueRunTime },
        };

        schema.properties.allocation = {
            default: app.portal_alloc || app.allocations[0],
            title: 'Allocation',
            description: 'Select the project allocation you would like to use with this job submission.',
            type: 'string',
            required: true,
            enum: app.allocations.sort(),
        };

        schema.properties.name = {
            title: 'Job name',
            description: 'A recognizable name for this job.',
            type: 'string',
            required: true,
            default: app.id + '_' + this.getDateString(),
            maxLength: 64,
        };

        schema.properties.archivePath = {
            title: 'Job output archive location (optional)',
            description: 'Specify a location where the job output should be archived. By default, job output will be archived at: <code>archive/jobs/${YYYY-MM-DD}/${JOB_NAME}-${JOB_ID}</code>.',
            type: 'string',
            format: 'agaveFile',
            id: 'archivePath',
            'x-schema-form': { placeholder: 'archive/jobs/${YYYY-MM-DD}/${JOB_NAME}-${JOB_ID}' },
        };

        schema.properties.nodeCount = {
            title: 'Node Count',
            description: `Number of requested process nodes for the job. Default number of nodes is ${app.defaultNodeCount}.`,
            type: 'integer',
            default: app.defaultNodeCount,
            minimum: 1,
            maximum: app.maxNodes,
        };

        schema.properties.processorsPerNode = {
            title: 'Processors Per Node',
            description: `Number of processors (cores) per node for the job. e.g. A selection of 16 processors per node along with 4 nodes
            will result in 16 processors on 4 nodes, with 64 processors total. Default number of processors per node is ${Math.floor(app.defaultProcessorsPerNode / app.defaultNodeCount)}.`,
            type: 'integer',
            default: Math.floor(app.defaultProcessorsPerNode / app.defaultNodeCount),
            minimum: 1,
            maximum: Math.floor(app.defaultProcessorsPerNode / app.defaultNodeCount),
        };

        return schema;
    }

}

export default Apps;
