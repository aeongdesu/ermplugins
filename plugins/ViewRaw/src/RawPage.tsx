import { cleanMessage } from "./cleanMessage"
import { getByProps } from "enmity/metro"
import { React, Clipboard, Toasts } from "enmity/metro/common"
import { ScrollView } from "enmity/components"
import { getIDByName } from "enmity/api/assets"
import Codeblock from "../../../utils/Codeblock"

const Button = getByProps("Looks", "Colors", "Sizes")

export default function RawPage({ message }) {
    const stringMessage = React.useMemo(() => JSON.stringify(cleanMessage(message), null, 4), [message.id])

    const style = { marginBottom: 8 }

    return (<>
        <ScrollView style={{ flex: 1, marginHorizontal: 14, marginVertical: 10 }}>
            <Button
                style={style}
                text="Copy Raw Content"
                color="brand"
                size="small"
                disabled={!message.content}
                onPress={() => {
                    Clipboard.setString(message.content)
                    Toasts.open({ content: "Copied content to clipboard", source: getIDByName("toast_copy_link") })
                }}
            />
            <Button
                style={style}
                text="Copy Raw Data"
                color="brand"
                size="small"
                onPress={() => {
                    Clipboard.setString(stringMessage)
                    Toasts.open({ content: "Copied data to clipboard", source: getIDByName("toast_copy_link") })
                }}
            />
            {message.content && <Codeblock selectable style={style}>{message.content}</Codeblock>}
            <Codeblock selectable>{stringMessage}</Codeblock>
        </ScrollView>
    </>)
}