import { memo, ReactNode } from "react";
import { ChartXValue } from "react-native-chart-kit/dist/v2/core";
import { AreaChart, LineChartDotRenderProps, LineChartSeries } from "react-native-chart-kit/v2";

interface Props{
    data: {channel: string, share: number}[]
    width: number
    height: number
    theme: { background: string, plotBackground: string, text: string, mutedText: string}
    formatXLabel: ((value: ChartXValue, index: number) => string) | undefined
    series: LineChartSeries<Record<string, unknown>>[] | undefined
    renderDot: ((props: LineChartDotRenderProps<Record<string, unknown>>) => ReactNode) | undefined
}

function Chart_Area({data, width, height, theme, formatXLabel, series, renderDot}:Props){
    return(
        <AreaChart
            data={data}
            xKey="channel"
            yKey="share"
            width={width}
            height={height}
            scrollable
            visiblePoints={10}
            theme={theme}
            formatXLabel={formatXLabel}
            showHorizontalGridLines
            showVerticalGridLines
            edgeLabelPolicy="show"
            yAxisLabelWidth="stable"
            series={series}
            renderDot={renderDot}
        />
    )
}
                
export default memo(Chart_Area)