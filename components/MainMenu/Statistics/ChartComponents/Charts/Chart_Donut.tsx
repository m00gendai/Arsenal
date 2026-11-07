import { memo } from "react"
import { PieChartArcLabelsConfig, PieChartCenterLabelRenderProps } from "react-native-chart-kit/dist/v2/react-native/charts/pie/types"
import { DonutChart } from "react-native-chart-kit/v2"

interface Props{
    data: {channel: string, share: number}[]
    sliceSeparator: {width: number, color: string}
    width: number
    height: number
    theme: { background: string, plotBackground: string, text: string, mutedText: string}
    colors: string[]
    arcLabels: PieChartArcLabelsConfig<Record<string, unknown>>
    centerLabel: React.ReactNode | ((props: PieChartCenterLabelRenderProps<{
        channel: string;
        share: number;
    }>) => React.ReactNode)
}

function Chart_Donut({data, sliceSeparator, width, height, theme, colors, arcLabels, centerLabel}:Props){
    return (
        <DonutChart
            data={data}
            valueKey="share"
            labelKey="channel"
            width={width}
            height={height}
            sliceSeparator={sliceSeparator}
            innerRadius={50}
            colors={colors}
            theme={theme}
            arcLabels={arcLabels}
            legend={false}
            centerLabel={centerLabel}
        />
    )
}

export default memo(Chart_Donut)