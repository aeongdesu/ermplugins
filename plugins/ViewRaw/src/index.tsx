import { Plugin, registerPlugin } from "enmity/managers/plugins"
import { bulk, filters } from "enmity/metro"
import { React, Navigation } from "enmity/metro/common"
import { create } from "enmity/patcher"
import { getIDByName } from "enmity/api/assets"
import { findInReactTree } from "enmity/utilities"
import manifest from "../manifest.json"
import ActionRow from "../../../utils/ActionRow"
import RawPage from "./RawPage"

const [
    LazyActionSheet,
    { getHeaderCloseButton },
    { Navigator }
] = bulk(
    filters.byProps("openLazy", "hideActionSheet"),
    filters.byProps("getHeaderCloseButton"),
    filters.byProps("Navigator")
)

const Patcher = create(manifest.name)

const ViewRaw: Plugin = {
    ...manifest,
    onStart() {
        Patcher.before(LazyActionSheet, "openLazy", (_, [component, key, msg]) => {
            const message = msg?.message
            if (key !== "MessageLongPressActionSheet" || !message) return
            component.then(instance => {
                const unpatch = Patcher.after(instance, "default", (_, __, res) => {
                    React.useEffect(() => () => { unpatch() }, [])
                    const buttons = findInReactTree(res, x => x?.[0]?.type?.name === "ButtonRow")
                    if (!buttons) return res

                    const navigator = () => (
                        <Navigator
                            initialRouteName="RawPage"
                            goBackOnBackPress
                            screens={{
                                RawPage: {
                                    title: "ViewRaw",
                                    headerLeft: getHeaderCloseButton(() => Navigation.pop()),
                                    render: () => <RawPage message={message} />
                                }
                            }}
                        />
                    )

                    buttons.push(
                        <ActionRow
                            label="View Raw"
                            icon={getIDByName("ic_chat_bubble_16px")}
                            onPress={() => {
                                LazyActionSheet.hideActionSheet()
                                Navigation.push(navigator)
                            }}
                        />
                    )
                })
            })
        })
    },
    onStop() {
        Patcher.unpatchAll()
    }
}

registerPlugin(ViewRaw)