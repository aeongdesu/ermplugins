// thanks to https://github.com/nexpid/vdp-shared/blob/main/src/components/RedesignRow.tsx
import { Image } from "enmity/components"
import { getByProps } from "enmity/metro"
import { React, StyleSheet, ColorMap } from "enmity/metro/common"

const { ActionSheetRow } = getByProps("ActionSheetRow")
const { FormRow } = getByProps("FormRow")

export default ({
  label,
  icon,
  onPress,
}: {
  label: string
  icon: number
  onPress?: () => void
}) => {
  const styles = StyleSheet.createThemedStyleSheet({
    iconComponent: {
      width: 24,
      height: 24,
      tintColor: ColorMap.colors.INTERACTIVE_NORMAL,
    }
  })

  return ActionSheetRow ? (
    <ActionSheetRow
      label={label}
      icon={
        <ActionSheetRow.Icon
          source={icon}
          IconComponent={() => (
            <Image
              resizeMode="cover"
              style={styles.iconComponent}
              source={icon}
            />
          )}
        />
      }
      onPress={onPress}
    />
  ) : (
    <FormRow
      label={label}
      leading={<FormRow.Icon source={icon} />}
      onPress={onPress}
    />
  )
}