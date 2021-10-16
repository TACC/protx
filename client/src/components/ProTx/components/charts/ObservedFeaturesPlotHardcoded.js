import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import './ObservedFeaturesPlot.css';
import { plotConfig } from '../shared/plotUtils';

function ObservedFeaturesPlotHardcoded({
  mapType,
  geography,
  observedFeature,
  year,
  selectedGeographicFeature,
  data,
  showRate
}) {
  const hardcoded = {
    data: [
      {
        marker: { color: 'rgb(5.0, 200.0, 200.0)' },
        opacity: 0.4,
        orientation: 'h',
        showlegend: false,
        type: 'bar',
        x: [13, 46, 100, 62, 18, 11, 3, 1, 0, 0],
        xaxis: 'x',
        y: [
          12232.77,
          16482.51,
          20732.25,
          24981.989999999998,
          29231.73,
          33481.47,
          37731.21,
          41980.95,
          46230.69,
          50480.43
        ],
        yaxis: 'y'
      },
      {
        line: { color: 'gray', dash: 'dash', width: 3 },
        mode: 'lines',
        name: 'mean',
        showlegend: true,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x',
        y: [22028.86220472441, 22028.86220472441],
        yaxis: 'y'
      },
      {
        line: { color: 'gray', dash: 'dot', width: 3 },
        mode: 'lines',
        name: 'median',
        showlegend: true,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x',
        y: [21631.5, 21631.5],
        yaxis: 'y'
      },
      {
        line: { color: 'black', width: 3 },
        mode: 'lines',
        name: 'Tarrant County',
        showlegend: true,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x',
        y: [27920, 27920],
        yaxis: 'y'
      },
      {
        marker: { color: 'rgb(29.375, 176.25, 176.25)' },
        opacity: 0.4,
        orientation: 'h',
        showlegend: false,
        type: 'bar',
        x: [9, 40, 100, 69, 21, 12, 2, 1, 0, 0],
        xaxis: 'x2',
        y: [
          12232.77,
          16482.51,
          20732.25,
          24981.989999999998,
          29231.73,
          33481.47,
          37731.21,
          41980.95,
          46230.69,
          50480.43
        ],
        yaxis: 'y2'
      },
      {
        line: { color: 'gray', dash: 'dash', width: 3 },
        mode: 'lines',
        name: 'mean',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x2',
        y: [22431.716535433072, 22431.716535433072],
        yaxis: 'y2'
      },
      {
        line: { color: 'gray', dash: 'dot', width: 3 },
        mode: 'lines',
        name: 'median',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x2',
        y: [21992, 21992],
        yaxis: 'y2'
      },
      {
        line: { color: 'black', width: 3 },
        mode: 'lines',
        name: 'Tarrant County',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x2',
        y: [28125, 28125],
        yaxis: 'y2'
      },
      {
        marker: { color: 'rgb(53.75, 152.5, 152.5)' },
        opacity: 0.4,
        orientation: 'h',
        showlegend: false,
        type: 'bar',
        x: [13, 46, 100, 62, 18, 11, 3, 1, 0, 0],
        xaxis: 'x3',
        y: [
          12232.77,
          16482.51,
          20732.25,
          24981.989999999998,
          29231.73,
          33481.47,
          37731.21,
          41980.95,
          46230.69,
          50480.43
        ],
        yaxis: 'y3'
      },
      {
        line: { color: 'gray', dash: 'dash', width: 3 },
        mode: 'lines',
        name: 'mean',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x3',
        y: [22028.86220472441, 22028.86220472441],
        yaxis: 'y3'
      },
      {
        line: { color: 'gray', dash: 'dot', width: 3 },
        mode: 'lines',
        name: 'median',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x3',
        y: [21631.5, 21631.5],
        yaxis: 'y3'
      },
      {
        line: { color: 'black', width: 3 },
        mode: 'lines',
        name: 'Tarrant County',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x3',
        y: [27920, 27920],
        yaxis: 'y3'
      },
      {
        marker: { color: 'rgb(78.125, 128.75, 128.75)' },
        opacity: 0.4,
        orientation: 'h',
        showlegend: false,
        type: 'bar',
        x: [6, 27, 93, 82, 30, 10, 5, 0, 1, 0],
        xaxis: 'x4',
        y: [
          12232.77,
          16482.51,
          20732.25,
          24981.989999999998,
          29231.73,
          33481.47,
          37731.21,
          41980.95,
          46230.69,
          50480.43
        ],
        yaxis: 'y4'
      },
      {
        line: { color: 'gray', dash: 'dash', width: 3 },
        mode: 'lines',
        name: 'mean',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x4',
        y: [23318.91338582677, 23318.91338582677],
        yaxis: 'y4'
      },
      {
        line: { color: 'gray', dash: 'dot', width: 3 },
        mode: 'lines',
        name: 'median',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x4',
        y: [22901, 22901],
        yaxis: 'y4'
      },
      {
        line: { color: 'black', width: 3 },
        mode: 'lines',
        name: 'Tarrant County',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x4',
        y: [28541, 28541],
        yaxis: 'y4'
      },
      {
        marker: { color: 'rgb(102.5, 105.0, 105.0)' },
        opacity: 0.4,
        orientation: 'h',
        showlegend: false,
        type: 'bar',
        x: [5, 26, 100, 73, 34, 10, 5, 0, 1, 0],
        xaxis: 'x5',
        y: [
          12232.77,
          16482.51,
          20732.25,
          24981.989999999998,
          29231.73,
          33481.47,
          37731.21,
          41980.95,
          46230.69,
          50480.43
        ],
        yaxis: 'y5'
      },
      {
        line: { color: 'gray', dash: 'dash', width: 3 },
        mode: 'lines',
        name: 'mean',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x5',
        y: [23551.799212598424, 23551.799212598424],
        yaxis: 'y5'
      },
      {
        line: { color: 'gray', dash: 'dot', width: 3 },
        mode: 'lines',
        name: 'median',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x5',
        y: [22747.5, 22747.5],
        yaxis: 'y5'
      },
      {
        line: { color: 'black', width: 3 },
        mode: 'lines',
        name: 'Tarrant County',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x5',
        y: [29058, 29058],
        yaxis: 'y5'
      },
      {
        marker: { color: 'rgb(126.875, 81.25, 81.25)' },
        opacity: 0.4,
        orientation: 'h',
        showlegend: false,
        type: 'bar',
        x: [4, 23, 80, 88, 40, 10, 7, 2, 0, 0],
        xaxis: 'x6',
        y: [
          12232.77,
          16482.51,
          20732.25,
          24981.989999999998,
          29231.73,
          33481.47,
          37731.21,
          41980.95,
          46230.69,
          50480.43
        ],
        yaxis: 'y6'
      },
      {
        line: { color: 'gray', dash: 'dash', width: 3 },
        mode: 'lines',
        name: 'mean',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x6',
        y: [24076.55905511811, 24076.55905511811],
        yaxis: 'y6'
      },
      {
        line: { color: 'gray', dash: 'dot', width: 3 },
        mode: 'lines',
        name: 'median',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x6',
        y: [23605, 23605],
        yaxis: 'y6'
      },
      {
        line: { color: 'black', width: 3 },
        mode: 'lines',
        name: 'Tarrant County',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x6',
        y: [29791, 29791],
        yaxis: 'y6'
      },
      {
        marker: { color: 'rgb(151.25, 57.5, 57.5)' },
        opacity: 0.4,
        orientation: 'h',
        showlegend: false,
        type: 'bar',
        x: [6, 18, 65, 98, 41, 15, 10, 1, 0, 0],
        xaxis: 'x7',
        y: [
          12232.77,
          16482.51,
          20732.25,
          24981.989999999998,
          29231.73,
          33481.47,
          37731.21,
          41980.95,
          46230.69,
          50480.43
        ],
        yaxis: 'y7'
      },
      {
        line: { color: 'gray', dash: 'dash', width: 3 },
        mode: 'lines',
        name: 'mean',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x7',
        y: [24859.01968503937, 24859.01968503937],
        yaxis: 'y7'
      },
      {
        line: { color: 'gray', dash: 'dot', width: 3 },
        mode: 'lines',
        name: 'median',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x7',
        y: [24284.5, 24284.5],
        yaxis: 'y7'
      },
      {
        line: { color: 'black', width: 3 },
        mode: 'lines',
        name: 'Tarrant County',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x7',
        y: [30857, 30857],
        yaxis: 'y7'
      },
      {
        marker: { color: 'rgb(175.625, 33.75, 33.75)' },
        opacity: 0.4,
        orientation: 'h',
        showlegend: false,
        type: 'bar',
        x: [5, 20, 46, 105, 48, 19, 8, 3, 0, 0],
        xaxis: 'x8',
        y: [
          12232.77,
          16482.51,
          20732.25,
          24981.989999999998,
          29231.73,
          33481.47,
          37731.21,
          41980.95,
          46230.69,
          50480.43
        ],
        yaxis: 'y8'
      },
      {
        line: { color: 'gray', dash: 'dash', width: 3 },
        mode: 'lines',
        name: 'mean',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x8',
        y: [25497.251968503937, 25497.251968503937],
        yaxis: 'y8'
      },
      {
        line: { color: 'gray', dash: 'dot', width: 3 },
        mode: 'lines',
        name: 'median',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x8',
        y: [25128.5, 25128.5],
        yaxis: 'y8'
      },
      {
        line: { color: 'black', width: 3 },
        mode: 'lines',
        name: 'Tarrant County',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x8',
        y: [32092, 32092],
        yaxis: 'y8'
      },
      {
        marker: { color: 'rgb(200.0, 10.0, 10.0)' },
        opacity: 0.4,
        orientation: 'h',
        showlegend: false,
        type: 'bar',
        x: [3, 17, 42, 90, 65, 23, 7, 5, 2, 0],
        xaxis: 'x9',
        y: [
          12232.77,
          16482.51,
          20732.25,
          24981.989999999998,
          29231.73,
          33481.47,
          37731.21,
          41980.95,
          46230.69,
          50480.43
        ],
        yaxis: 'y9'
      },
      {
        line: { color: 'gray', dash: 'dash', width: 3 },
        mode: 'lines',
        name: 'mean',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x9',
        y: [26280.503937007874, 26280.503937007874],
        yaxis: 'y9'
      },
      {
        line: { color: 'gray', dash: 'dot', width: 3 },
        mode: 'lines',
        name: 'median',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x9',
        y: [25928.5, 25928.5],
        yaxis: 'y9'
      },
      {
        line: { color: 'black', width: 3 },
        mode: 'lines',
        name: 'Tarrant County',
        showlegend: false,
        type: 'scatter',
        x: [0, 115.50000000000001],
        xaxis: 'x9',
        y: [33292, 33292],
        yaxis: 'y9'
      }
    ],
    layout: {
      annotations: [
        {
          font: { size: 16 },
          showarrow: false,
          text: '2011',
          x: 0.04567901234567901,
          xanchor: 'center',
          xref: 'paper',
          y: 1,
          yanchor: 'bottom',
          yref: 'paper'
        },
        {
          font: { size: 16 },
          showarrow: false,
          text: '2012',
          x: 0.15925925925925927,
          xanchor: 'center',
          xref: 'paper',
          y: 1,
          yanchor: 'bottom',
          yref: 'paper'
        },
        {
          font: { size: 16 },
          showarrow: false,
          text: '2013',
          x: 0.27283950617283953,
          xanchor: 'center',
          xref: 'paper',
          y: 1,
          yanchor: 'bottom',
          yref: 'paper'
        },
        {
          font: { size: 16 },
          showarrow: false,
          text: '2014',
          x: 0.38641975308641974,
          xanchor: 'center',
          xref: 'paper',
          y: 1,
          yanchor: 'bottom',
          yref: 'paper'
        },
        {
          font: { size: 16 },
          showarrow: false,
          text: '2015',
          x: 0.5,
          xanchor: 'center',
          xref: 'paper',
          y: 1,
          yanchor: 'bottom',
          yref: 'paper'
        },
        {
          font: { size: 16 },
          showarrow: false,
          text: '2016',
          x: 0.6135802469135803,
          xanchor: 'center',
          xref: 'paper',
          y: 1,
          yanchor: 'bottom',
          yref: 'paper'
        },
        {
          font: { size: 16 },
          showarrow: false,
          text: '2017',
          x: 0.7271604938271605,
          xanchor: 'center',
          xref: 'paper',
          y: 1,
          yanchor: 'bottom',
          yref: 'paper'
        },
        {
          font: { size: 16 },
          showarrow: false,
          text: '2018',
          x: 0.8407407407407408,
          xanchor: 'center',
          xref: 'paper',
          y: 1,
          yanchor: 'bottom',
          yref: 'paper'
        },
        {
          font: { size: 16 },
          showarrow: false,
          text: '2019',
          x: 0.954320987654321,
          xanchor: 'center',
          xref: 'paper',
          y: 1,
          yanchor: 'bottom',
          yref: 'paper'
        },
        {
          font: { size: 16 },
          showarrow: false,
          text: 'Number of counties',
          x: 0.5,
          xanchor: 'center',
          xref: 'paper',
          y: 0,
          yanchor: 'top',
          yref: 'paper',
          yshift: -30
        }
      ],
      bargap: 0,
      template: {
        data: {
          bar: [
            {
              error_x: { color: '#2a3f5f' },
              error_y: { color: '#2a3f5f' },
              marker: {
                line: { color: '#E5ECF6', width: 0.5 },
                pattern: { fillmode: 'overlay', size: 10, solidity: 0.2 }
              },
              type: 'bar'
            }
          ],
          barpolar: [
            {
              marker: {
                line: { color: '#E5ECF6', width: 0.5 },
                pattern: { fillmode: 'overlay', size: 10, solidity: 0.2 }
              },
              type: 'barpolar'
            }
          ],
          carpet: [
            {
              aaxis: {
                endlinecolor: '#2a3f5f',
                gridcolor: 'white',
                linecolor: 'white',
                minorgridcolor: 'white',
                startlinecolor: '#2a3f5f'
              },
              baxis: {
                endlinecolor: '#2a3f5f',
                gridcolor: 'white',
                linecolor: 'white',
                minorgridcolor: 'white',
                startlinecolor: '#2a3f5f'
              },
              type: 'carpet'
            }
          ],
          choropleth: [
            { colorbar: { outlinewidth: 0, ticks: '' }, type: 'choropleth' }
          ],
          contour: [
            {
              colorbar: { outlinewidth: 0, ticks: '' },
              colorscale: [
                [0, '#0d0887'],
                [0.1111111111111111, '#46039f'],
                [0.2222222222222222, '#7201a8'],
                [0.3333333333333333, '#9c179e'],
                [0.4444444444444444, '#bd3786'],
                [0.5555555555555556, '#d8576b'],
                [0.6666666666666666, '#ed7953'],
                [0.7777777777777778, '#fb9f3a'],
                [0.8888888888888888, '#fdca26'],
                [1, '#f0f921']
              ],
              type: 'contour'
            }
          ],
          contourcarpet: [
            { colorbar: { outlinewidth: 0, ticks: '' }, type: 'contourcarpet' }
          ],
          heatmap: [
            {
              colorbar: { outlinewidth: 0, ticks: '' },
              colorscale: [
                [0, '#0d0887'],
                [0.1111111111111111, '#46039f'],
                [0.2222222222222222, '#7201a8'],
                [0.3333333333333333, '#9c179e'],
                [0.4444444444444444, '#bd3786'],
                [0.5555555555555556, '#d8576b'],
                [0.6666666666666666, '#ed7953'],
                [0.7777777777777778, '#fb9f3a'],
                [0.8888888888888888, '#fdca26'],
                [1, '#f0f921']
              ],
              type: 'heatmap'
            }
          ],
          heatmapgl: [
            {
              colorbar: { outlinewidth: 0, ticks: '' },
              colorscale: [
                [0, '#0d0887'],
                [0.1111111111111111, '#46039f'],
                [0.2222222222222222, '#7201a8'],
                [0.3333333333333333, '#9c179e'],
                [0.4444444444444444, '#bd3786'],
                [0.5555555555555556, '#d8576b'],
                [0.6666666666666666, '#ed7953'],
                [0.7777777777777778, '#fb9f3a'],
                [0.8888888888888888, '#fdca26'],
                [1, '#f0f921']
              ],
              type: 'heatmapgl'
            }
          ],
          histogram: [
            {
              marker: {
                pattern: { fillmode: 'overlay', size: 10, solidity: 0.2 }
              },
              type: 'histogram'
            }
          ],
          histogram2d: [
            {
              colorbar: { outlinewidth: 0, ticks: '' },
              colorscale: [
                [0, '#0d0887'],
                [0.1111111111111111, '#46039f'],
                [0.2222222222222222, '#7201a8'],
                [0.3333333333333333, '#9c179e'],
                [0.4444444444444444, '#bd3786'],
                [0.5555555555555556, '#d8576b'],
                [0.6666666666666666, '#ed7953'],
                [0.7777777777777778, '#fb9f3a'],
                [0.8888888888888888, '#fdca26'],
                [1, '#f0f921']
              ],
              type: 'histogram2d'
            }
          ],
          histogram2dcontour: [
            {
              colorbar: { outlinewidth: 0, ticks: '' },
              colorscale: [
                [0, '#0d0887'],
                [0.1111111111111111, '#46039f'],
                [0.2222222222222222, '#7201a8'],
                [0.3333333333333333, '#9c179e'],
                [0.4444444444444444, '#bd3786'],
                [0.5555555555555556, '#d8576b'],
                [0.6666666666666666, '#ed7953'],
                [0.7777777777777778, '#fb9f3a'],
                [0.8888888888888888, '#fdca26'],
                [1, '#f0f921']
              ],
              type: 'histogram2dcontour'
            }
          ],
          mesh3d: [
            { colorbar: { outlinewidth: 0, ticks: '' }, type: 'mesh3d' }
          ],
          parcoords: [
            {
              line: { colorbar: { outlinewidth: 0, ticks: '' } },
              type: 'parcoords'
            }
          ],
          pie: [{ automargin: true, type: 'pie' }],
          scatter: [
            {
              marker: { colorbar: { outlinewidth: 0, ticks: '' } },
              type: 'scatter'
            }
          ],
          scatter3d: [
            {
              line: { colorbar: { outlinewidth: 0, ticks: '' } },
              marker: { colorbar: { outlinewidth: 0, ticks: '' } },
              type: 'scatter3d'
            }
          ],
          scattercarpet: [
            {
              marker: { colorbar: { outlinewidth: 0, ticks: '' } },
              type: 'scattercarpet'
            }
          ],
          scattergeo: [
            {
              marker: { colorbar: { outlinewidth: 0, ticks: '' } },
              type: 'scattergeo'
            }
          ],
          scattergl: [
            {
              marker: { colorbar: { outlinewidth: 0, ticks: '' } },
              type: 'scattergl'
            }
          ],
          scattermapbox: [
            {
              marker: { colorbar: { outlinewidth: 0, ticks: '' } },
              type: 'scattermapbox'
            }
          ],
          scatterpolar: [
            {
              marker: { colorbar: { outlinewidth: 0, ticks: '' } },
              type: 'scatterpolar'
            }
          ],
          scatterpolargl: [
            {
              marker: { colorbar: { outlinewidth: 0, ticks: '' } },
              type: 'scatterpolargl'
            }
          ],
          scatterternary: [
            {
              marker: { colorbar: { outlinewidth: 0, ticks: '' } },
              type: 'scatterternary'
            }
          ],
          surface: [
            {
              colorbar: { outlinewidth: 0, ticks: '' },
              colorscale: [
                [0, '#0d0887'],
                [0.1111111111111111, '#46039f'],
                [0.2222222222222222, '#7201a8'],
                [0.3333333333333333, '#9c179e'],
                [0.4444444444444444, '#bd3786'],
                [0.5555555555555556, '#d8576b'],
                [0.6666666666666666, '#ed7953'],
                [0.7777777777777778, '#fb9f3a'],
                [0.8888888888888888, '#fdca26'],
                [1, '#f0f921']
              ],
              type: 'surface'
            }
          ],
          table: [
            {
              cells: { fill: { color: '#EBF0F8' }, line: { color: 'white' } },
              header: { fill: { color: '#C8D4E3' }, line: { color: 'white' } },
              type: 'table'
            }
          ]
        },
        layout: {
          annotationdefaults: {
            arrowcolor: '#2a3f5f',
            arrowhead: 0,
            arrowwidth: 1
          },
          autotypenumbers: 'strict',
          coloraxis: { colorbar: { outlinewidth: 0, ticks: '' } },
          colorscale: {
            diverging: [
              [0, '#8e0152'],
              [0.1, '#c51b7d'],
              [0.2, '#de77ae'],
              [0.3, '#f1b6da'],
              [0.4, '#fde0ef'],
              [0.5, '#f7f7f7'],
              [0.6, '#e6f5d0'],
              [0.7, '#b8e186'],
              [0.8, '#7fbc41'],
              [0.9, '#4d9221'],
              [1, '#276419']
            ],
            sequential: [
              [0, '#0d0887'],
              [0.1111111111111111, '#46039f'],
              [0.2222222222222222, '#7201a8'],
              [0.3333333333333333, '#9c179e'],
              [0.4444444444444444, '#bd3786'],
              [0.5555555555555556, '#d8576b'],
              [0.6666666666666666, '#ed7953'],
              [0.7777777777777778, '#fb9f3a'],
              [0.8888888888888888, '#fdca26'],
              [1, '#f0f921']
            ],
            sequentialminus: [
              [0, '#0d0887'],
              [0.1111111111111111, '#46039f'],
              [0.2222222222222222, '#7201a8'],
              [0.3333333333333333, '#9c179e'],
              [0.4444444444444444, '#bd3786'],
              [0.5555555555555556, '#d8576b'],
              [0.6666666666666666, '#ed7953'],
              [0.7777777777777778, '#fb9f3a'],
              [0.8888888888888888, '#fdca26'],
              [1, '#f0f921']
            ]
          },
          colorway: [
            '#636efa',
            '#EF553B',
            '#00cc96',
            '#ab63fa',
            '#FFA15A',
            '#19d3f3',
            '#FF6692',
            '#B6E880',
            '#FF97FF',
            '#FECB52'
          ],
          font: { color: '#2a3f5f' },
          geo: {
            bgcolor: 'white',
            lakecolor: 'white',
            landcolor: '#E5ECF6',
            showlakes: true,
            showland: true,
            subunitcolor: 'white'
          },
          hoverlabel: { align: 'left' },
          hovermode: 'closest',
          mapbox: { style: 'light' },
          paper_bgcolor: 'white',
          plot_bgcolor: '#E5ECF6',
          polar: {
            angularaxis: { gridcolor: 'white', linecolor: 'white', ticks: '' },
            bgcolor: '#E5ECF6',
            radialaxis: { gridcolor: 'white', linecolor: 'white', ticks: '' }
          },
          scene: {
            xaxis: {
              backgroundcolor: '#E5ECF6',
              gridcolor: 'white',
              gridwidth: 2,
              linecolor: 'white',
              showbackground: true,
              ticks: '',
              zerolinecolor: 'white'
            },
            yaxis: {
              backgroundcolor: '#E5ECF6',
              gridcolor: 'white',
              gridwidth: 2,
              linecolor: 'white',
              showbackground: true,
              ticks: '',
              zerolinecolor: 'white'
            },
            zaxis: {
              backgroundcolor: '#E5ECF6',
              gridcolor: 'white',
              gridwidth: 2,
              linecolor: 'white',
              showbackground: true,
              ticks: '',
              zerolinecolor: 'white'
            }
          },
          shapedefaults: { line: { color: '#2a3f5f' } },
          ternary: {
            aaxis: { gridcolor: 'white', linecolor: 'white', ticks: '' },
            baxis: { gridcolor: 'white', linecolor: 'white', ticks: '' },
            bgcolor: '#E5ECF6',
            caxis: { gridcolor: 'white', linecolor: 'white', ticks: '' }
          },
          title: { x: 0.05 },
          xaxis: {
            automargin: true,
            gridcolor: 'white',
            linecolor: 'white',
            ticks: '',
            title: { standoff: 15 },
            zerolinecolor: 'white',
            zerolinewidth: 2
          },
          yaxis: {
            automargin: true,
            gridcolor: 'white',
            linecolor: 'white',
            ticks: '',
            title: { standoff: 15 },
            zerolinecolor: 'white',
            zerolinewidth: 2
          }
        }
      },
      xaxis: {
        anchor: 'y',
        domain: [0, 0.09135802469135802],
        range: [0, 115.50000000000001]
      },
      xaxis2: {
        anchor: 'y2',
        domain: [0.11358024691358025, 0.20493827160493827],
        range: [0, 115.50000000000001]
      },
      xaxis3: {
        anchor: 'y3',
        domain: [0.2271604938271605, 0.31851851851851853],
        range: [0, 115.50000000000001]
      },
      xaxis4: {
        anchor: 'y4',
        domain: [0.34074074074074073, 0.43209876543209874],
        range: [0, 115.50000000000001]
      },
      xaxis5: {
        anchor: 'y5',
        domain: [0.454320987654321, 0.5456790123456791],
        range: [0, 115.50000000000001]
      },
      xaxis6: {
        anchor: 'y6',
        domain: [0.5679012345679012, 0.6592592592592592],
        range: [0, 115.50000000000001]
      },
      xaxis7: {
        anchor: 'y7',
        domain: [0.6814814814814815, 0.7728395061728395],
        range: [0, 115.50000000000001]
      },
      xaxis8: {
        anchor: 'y8',
        domain: [0.7950617283950617, 0.8864197530864197],
        range: [0, 115.50000000000001]
      },
      xaxis9: {
        anchor: 'y9',
        domain: [0.908641975308642, 1],
        range: [0, 115.50000000000001]
      },
      yaxis: {
        anchor: 'x',
        domain: [0, 1],
        range: [10107.9, 52605.3],
        ticktext: [
          '10-14',
          '14-19',
          '19-23',
          '23-27',
          '27-31',
          '31-36',
          '36-40',
          '40-44',
          '44-48',
          '48-53'
        ],
        tickvals: [
          12232.77,
          16482.51,
          20732.25,
          24981.989999999998,
          29231.73,
          33481.47,
          37731.21,
          41980.95,
          46230.69,
          50480.43
        ],
        title: { text: 'per capita income (1000s of dollars)' },
        visible: true
      },
      yaxis2: {
        anchor: 'x2',
        domain: [0, 1],
        range: [10107.9, 52605.3],
        visible: false
      },
      yaxis3: {
        anchor: 'x3',
        domain: [0, 1],
        range: [10107.9, 52605.3],
        visible: false
      },
      yaxis4: {
        anchor: 'x4',
        domain: [0, 1],
        range: [10107.9, 52605.3],
        visible: false
      },
      yaxis5: {
        anchor: 'x5',
        domain: [0, 1],
        range: [10107.9, 52605.3],
        visible: false
      },
      yaxis6: {
        anchor: 'x6',
        domain: [0, 1],
        range: [10107.9, 52605.3],
        visible: false
      },
      yaxis7: {
        anchor: 'x7',
        domain: [0, 1],
        range: [10107.9, 52605.3],
        visible: false
      },
      yaxis8: {
        anchor: 'x8',
        domain: [0, 1],
        range: [10107.9, 52605.3],
        visible: false
      },
      yaxis9: {
        anchor: 'x9',
        domain: [0, 1],
        range: [10107.9, 52605.3],
        visible: false
      }
    }
  };

  const style = {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 900
  };

  const getObservedFeaturesPlotLayout = () => {
    return (
      <div className="observed-features-plot-layout">
        <div className="observed-features-plot-header" />
        <div className="observed-features-plot-chart-body">
          <div className="observed-features-plot-chart-body-plot">
            <div style={style}>HARDCODED JUPYTER FIGURE DATA</div>
            <Plot
              divId="observed-features-plot"
              className="observed-features-plot"
              data={hardcoded.data}
              layout={hardcoded.layout}
              config={plotConfig}
              useResizeHandler
            />
          </div>
        </div>
        <div className="observed-features-plot-chart-footer" />
      </div>
    );
  };

  const observedFeaturesPlotLayout = getObservedFeaturesPlotLayout();

  return (
    <div className="observed-features-plot">{observedFeaturesPlotLayout}</div>
  );
}

ObservedFeaturesPlotHardcoded.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  showRate: PropTypes.bool.isRequired
};

ObservedFeaturesPlotHardcoded.defaultProps = {};

export default ObservedFeaturesPlotHardcoded;
