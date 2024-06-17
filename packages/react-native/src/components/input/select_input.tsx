import React, { useState } from "react";
import { SelectInputPlaceholder, SelectInputProps } from "../action_sheet_options/placeholder";
import { ActionSheetDataOption } from "components/action_sheet_options/interface";
import { ActionSheetOptions, ActionSheetOptionsProps } from "components/action_sheet_options/main";


interface SelectWrapperBoxProp extends SelectInputProps, ActionSheetOptionsProps {
  editable?: boolean;
  options: ActionSheetDataOption[];
  onSelect?: (selected: ActionSheetDataOption) => void;
}

export const SelectWrapperBox: React.FC<SelectWrapperBoxProp> = ({
  editable,
  options,
  onSelect,
  ...rest
}) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <ActionSheetOptions
      title={rest.title}
      options={options}
      editable={editable}
      onSelect={onSelect}
      onToggleSheet={(status) => setActive(status)}
      containerStyle={rest.containerStyle}
      renderPlaceholder={
        <SelectInputPlaceholder
          inputFocused={active}
          {...rest}
        />
      }
    />
  );
};
