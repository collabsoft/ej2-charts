<!-- markdownlint-disable MD010 -->

<!-- markdownlint-disable MD030 -->

<!-- markdownlint-disable MD004 -->

# Changelog

## [Unreleased]

### Common

#### New Features

- Added support for SVG and PDF export.

### Chart

#### New Features

- Multicolored line type and area type series have been added to chart.
- A new date-time category axis has been added.
- Spline area series type has been added to chart.
- Support has been provided to customize axis labels in multiple levels.
- Support has been provided to wrap the chart title.
- Support has been provided to sort data points in either ascending or descending order.
- Supports to move the axis labels and ticks inside the chart area.
- Axis crossing feature has been added to chart.

## 15.4.27-preview (2018-01-30)

### Chart

#### Bug Fixes

- Vertical chart for step area is not working fixed.
- Stacking Area in polar and radar not proper is fixed.
- MACD indicators not working properly in angular is fixed.
- Marker explode not proper on image type is fixed.
- Datalabel template for stacking 100 is now working properly.
- Pinch zooming is now working properly when zoom factor and position is provided.
- Binding complex datasource to chart series is now working properly.

## 15.4.23-preview (2017-12-27)

### Common

#### New Features

- Added typing file for ES5 global scripts (dist/global/index.d.ts)

#### Breaking Changes

- Modified the module bundle file name for ES6 bundling

## 15.4.22-preview (2017-12-14)

### Common

#### New Features

- Upgraded TypeScript version to 2.6.2

## 15.4.17-preview (2017-11-13)

### Chart

Chart component is used to visualize the data with user interactivity and provides customization
options to configure the data visually. All chart elements are rendered by using Scalable Vector
Graphics (SVG).

- **Series** - Chart can plot over 28 chart types that are ranging from line charts to specialized financial charts
- **Data Binding** - Binds the data with local and remote data source.
- **Data Labels and Markers** - Supports data label and marker to annotate and enhance a data.
- **Error Bar** - Supports error bar to plot possible errors in data points.
- **Axis Types** - Supports four different types of axes, namely Numerical, Categorical, Datetime, and Logarithmic.
- **Axis Feature** - Supports multiple axes, inverted axis, multiple panes, opposed position,stripline, and smart labels.
- **Legend** - Supports legend to provide additional information about a series with paging and customization options.
- **Technical Indicators** -  Support for RSI, Momentum, Bollinger band, accumulation distribution,EMA, SMA, stochastic, ATR, MACD, and TMA indicators.
- **Trendlines** - Supports linear, exponential, logarithmic, power, polynomial, and moving average trendlines.
- **Animation** - Chart series will be animated when rendering and refreshing the chart widget.
- **User Interaction** - Supports interactive features that are zooming, panning, crosshair, trackball, tooltip, and data point selection.
- **Annotation** - Supports annotation to mark a specific area in chart.
- **Export** - Supports to print the chart directly from the browser and exports the chart in both JPEG and PNG format.
