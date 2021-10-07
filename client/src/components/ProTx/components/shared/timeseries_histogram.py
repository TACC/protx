  """
  This method depends on the mock observed features data structure response.
  """

import plotly
from plotly.subplots import make_subplots
import plotly.graph_objects as go
from plotly.colors import n_colors

def timeseries_histogram(hist_data):
    
    #########################
    ## SET PLOT AESTHETICS ## 
    #########################
    
    # only county and tract supported; rename to .db file later
    pluralize = {'county': 'counties', 'tract': 'census tracts'}
    fmt_units = pluralize[hist_data['fig_aes']['geotype']]
    
    # number of years to cover: always 2011-2019 (for now)
    years = [i for i in range(2011, 2020)]
    
    # make a plot with all the panels
    fig = make_subplots(
        rows=1, cols=len(years), 
        x_title=f'Number of {fmt_units}',
        subplot_titles=[str(i) for i in years])
    
    #################################
    ## MAKE SUBPLOTS FOR 2011-2019 ##
    #################################
    
    colnum = 1
    colors = n_colors('rgb(5, 200, 200)', 'rgb(200, 10, 10)', len(years), colortype='rgb')
    for year, color in zip(years, colors):
        data = hist_data['years'][year]

        ###################################
        ## CONDITIONAL LEGEND FORMATTING ##
        ###################################
        
        # only generate legend for mean and median value lines on first plot
        if colnum == 1:
            show_legend = True
            
            # only show legend for focal area highlight for column 1, if the value is present
            if hist_data['fig_aes']['focal_display']:
                show_highlight = True
            else:
                show_highlight = False
        else:
            show_legend = False
            show_highlight = False

        ##########
        ## BARS ##
        ##########
        
        fig.add_trace(
            go.Bar(
                y=hist_data['fig_aes']['bar_centers'], 
                x=data['bars'], 
                orientation='h', 
                showlegend=False, 
                marker_color=color, 
                opacity=0.4
            ),
            row=1, col=colnum
        )

        #####################
        ## MEAN AND MEDIAN ##
        #####################
        
        fig.add_trace(
            go.Scatter(
                x=hist_data['fig_aes']['xrange'],
                y=[data['mean'] for i in range(2)],
                name='mean', 
                showlegend=show_legend,
                mode='lines',
                line=dict(color='gray', width=3, dash='dash')
            ), 
            row=1, col=colnum)

        fig.add_trace(
            go.Scatter(
                x=hist_data['fig_aes']['xrange'],
                y=[data['median'] for i in range(2)],
                name='median', 
                showlegend=show_legend,
                mode='lines',
                line=dict(color='gray', width=3, dash='dot')
            ), 
            row=1, col=colnum)
        
        ###########################
        ## FOCAL AREA HIGHLIGHTS ##
        ###########################
        
        fig.add_trace(
            go.Scatter(
                x=hist_data['fig_aes']['xrange'],
                y=[data['focal_value'] for i in range(2)],
                name=hist_data['fig_aes']['focal_display'], 
                showlegend=show_highlight,
                mode='lines',
                line=dict(color='black', width=3)
            ), 
            row=1, col=colnum)

        # after all the bars are drawn, move on to the next year (column)
        colnum += 1

    ###################
    ## UPDATE LAYOUT ##
    ###################
    
    fig.update_layout(bargap=0.0)

    for col, title in enumerate(years):
        fig.update_yaxes(visible=False, row=1, col=col+1, range=hist_data['fig_aes']['yrange'])

    fig.update_yaxes(
        title_text=hist_data['fig_aes']['label_units'],
        visible=True, 
        row=1, col=1,
        tickvals=hist_data['fig_aes']['bar_centers'], # same for all plots, so use the last value returned in graph generation loop
        ticktext=hist_data['fig_aes']['bar_labels'], # same for all plots, so use the last value returned in graph generation loop
        range=hist_data['fig_aes']['yrange']
    )
    
    fig.update_xaxes(
        range=hist_data['fig_aes']['xrange']
    )
    return(fig)
