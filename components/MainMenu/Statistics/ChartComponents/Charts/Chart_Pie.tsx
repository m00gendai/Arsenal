import { memo } from "react"
import { PieChartArcLabelsConfig } from "react-native-chart-kit/dist/v2/react-native/charts/pie/types"
import { PieChart } from "react-native-chart-kit/v2"

interface Props{
    data: {channel: string, share: number}[]
    sliceSeparator: {width: number, color: string}
    width: number
    height: number
    theme: { background: string, plotBackground: string, text: string, mutedText: string}
    colors: string[]
    arcLabels: PieChartArcLabelsConfig<Record<string, unknown>>
}

function Chart_Pie({data, sliceSeparator, width, height, theme, colors, arcLabels}:Props){
    return (
        <PieChart
            data={data}
            valueKey="share"
            labelKey="channel"
            sliceSeparator={sliceSeparator}
            width={width}
            height={height}
            legend={false}
            theme={theme}
            colors={colors}
            arcLabels={arcLabels}
        />
    )
}

export default memo(Chart_Pie)