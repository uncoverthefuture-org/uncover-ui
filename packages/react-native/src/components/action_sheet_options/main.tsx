import React, { createRef, useState } from "react";
import {
  Platform, TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import {
  fontPixel,
  heightPixel
} from "utils/pxToDpConvert";
import { BoldText } from "../text/styled";
import { Picker } from "@react-native-picker/picker";
import { FlatList } from "react-native-gesture-handler";
import { ActionContainer, AndroidOptions, AndroidOptionsContainer, DecisionBar, SelectPlanRender, TitleBox } from "./styled";
import { useThemeMode } from "providers/hooks";
import { ActionSheetDataOption } from "./interface";




export type ActionSheetOptionsProps = {
  options: ActionSheetDataOption[];
  category?: string;
  title: string;
  editable?: boolean;
  onToggleSheet?: (status: boolean) => void;
  onSelect?: (item: ActionSheetDataOption) => void;
  renderPlaceholder?: React.ReactNode;
  containerStyle?: ViewStyle;
};

export const ActionSheetOptions: React.FC<ActionSheetOptionsProps> = ({
  title,
  category = "Choose an Option",
  options,
  editable = true,
  onToggleSheet = () => { },
  onSelect = () => { },
  renderPlaceholder,
  containerStyle
}) => {
  const { colors } = useThemeMode();
  const [selected, setSelected] = useState<ActionSheetDataOption>();
  const actionSheetRef: any = createRef();
  let flatListRef: FlatList<ActionSheetDataOption> | null = null;


  const isCurrentValue = (value?: string | number) => (selected?.value === value);

  const onValueChange = (value: ActionSheetDataOption) => {
    onSelect(value)
  }

  const onOpenSheet = () => {
    actionSheetRef.current?.setModalVisible(true)
    onToggleSheet(true)
  }

  const onCloseSheet = () => {
    actionSheetRef.current?.setModalVisible(false)
    onToggleSheet(false)
    if (selected) {
      onValueChange(selected)
    }
  }


  const getItemLayout = (
    data: ArrayLike<ActionSheetDataOption> | undefined | null,
    index: number
  ) => ({ length: 60, offset: 60 * index, index });

  // options.indexOf(selected)

  const renderPlans = (data: ActionSheetDataOption[]) => {
    return Platform.OS === "ios" ? (
      <Picker
        selectedValue={selected?.value}
        onValueChange={(itemValue, itemIndex) => {
          if (itemValue.length) {
            setSelected(data[itemIndex - 1]);
          }
        }}
      >
        <Picker.Item label={title} value="" />
        {data?.map((item: any) => {
          return (
            <Picker.Item key={item} label={item.label} value={item.value} />
          );
        })}
      </Picker>
    ) : (
      <AndroidOptionsContainer>
        <FlatList
          ref={(ref) => { flatListRef = ref; }}
          data={data}
          keyExtractor={(item) => `${item.label}`}
          getItemLayout={getItemLayout}
          initialScrollIndex={selected ? data.indexOf(selected) : 0}
          initialNumToRender={2}
          ListHeaderComponent={
            <AndroidOptions
              disabled={true}
              style={{
                backgroundColor: "transparent",
                borderWidth: 0.8,
                borderColor: "#eee",
              }}
              selected={selected?.value === ""}
            >
              <BoldText color="rgba(0, 0, 0, 0.43)">{title}</BoldText>
            </AndroidOptions>
          }
          ListFooterComponent={<View style={{ height: 50 }}></View>}
          renderItem={({ item }) => {
            return (
              <AndroidOptions
                key={item.label}
                selected={selected?.value === item.value}
                onPress={() => setSelected(item)}
              >
                <BoldText color={isCurrentValue() ? colors.text : colors.black_4}>
                  {item.label}
                </BoldText>
              </AndroidOptions>
            );
          }}
        />
      </AndroidOptionsContainer>
    );
  };

  return (
    <ActionContainer style={containerStyle} >
      <TouchableOpacity
        disabled={!editable}
        onPress={() => onOpenSheet()}
      >{renderPlaceholder}</TouchableOpacity>
      <ActionSheet ref={actionSheetRef}>
        <DecisionBar>
          <TitleBox>
            <BoldText
              color={colors.text}
              fontSize={fontPixel(17)}
              lineHeight={heightPixel(20)}
            >
              {category}
            </BoldText>
          </TitleBox>
          <TouchableOpacity onPress={() => onCloseSheet()}>
            <BoldText
              fontSize={fontPixel(17)}
              lineHeight={heightPixel(20)}
              color={colors.black_4}
            >
              Done
            </BoldText>
          </TouchableOpacity>
        </DecisionBar>
        <SelectPlanRender>{renderPlans(options)}</SelectPlanRender>
      </ActionSheet>
    </ActionContainer>
  );
};
