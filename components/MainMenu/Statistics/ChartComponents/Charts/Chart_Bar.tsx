import { memo, ReactNode } from "react";
import { ChartXValue } from "react-native-chart-kit/dist/v2/core";
import { BarChart, BarChartRenderBarProps } from "react-native-chart-kit/v2";

interface Props{
    data: {channel: string, share: number}[]
    orientation: "vertical" | "horizontal"
    width: number
    height: number
    yDomain: {min: number, max: number, nice: boolean}
    formatXLabel: (value: ChartXValue, index: number) => string
    theme: { background: string, plotBackground: string, text: string, mutedText: string}
    chartRenderBar: ((props: BarChartRenderBarProps<{ channel: string; share: number; }>) => ReactNode) | undefined
}

function Chart_Bar({data, orientation, width, height, yDomain, formatXLabel, theme, chartRenderBar}:Props) {

    return(
        <BarChart
            data={data}
            xKey="channel"
            yKey="share"
            orientation={orientation}
            showValuesOnTopOfBars={false}
            width={width}
            height={height}
            scrollable
            visiblePoints={10}
            initialIndex="start"
            yDomain={yDomain}
            formatXLabel={formatXLabel}
            theme={theme}
            renderBar={chartRenderBar}
        />
    )
}

export default memo(Chart_Bar)
