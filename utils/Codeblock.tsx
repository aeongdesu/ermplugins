// https://github.com/vendetta-mod/Vendetta/blob/e5d35028344363a8dacb67fca4d48266b79b2643/src/ui/components/Codeblock.tsx

import { common } from "enmity/metro"
import { React, ColorMap, StyleSheet, Constants } from "enmity/metro/common"

interface CodeblockProps {
    selectable?: boolean
    style?: import("react-native").TextStyle
    children?: string
}

//@ts-ignore
const RN = common.ReactNative as typeof import("react-native")

const styles = StyleSheet.createThemedStyleSheet({
    codeBlock: {
        fontFamily: Constants.Fonts.CODE_SEMIBOLD,
        fontSize: 12,
        textAlignVertical: "center",
        backgroundColor: ColorMap.colors.BACKGROUND_SECONDARY,
        color: ColorMap.colors.TEXT_NORMAL,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: ColorMap.colors.BACKGROUND_TERTIARY,
        padding: 10,
    }
})

// iOS doesn't support the selectable property on RN.Text...
// leaving other platforms like android, v3 waiting room
const InputBasedCodeblock = ({ style, children }: CodeblockProps) => <RN.TextInput editable={false} multiline style={[styles.codeBlock, style && style]} value={children} />
const TextBasedCodeblock = ({ selectable, style, children }: CodeblockProps) => <RN.Text selectable={selectable} style={[styles.codeBlock, style && style]}>{children}</RN.Text>

export default ({ selectable, style, children }: CodeblockProps) => {
    if (!selectable) return <TextBasedCodeblock style={style} children={children} />

    return RN.Platform.select({
        ios: <InputBasedCodeblock style={style} children={children} />,
        default: <TextBasedCodeblock style={style} children={children} selectable />,
    })
}