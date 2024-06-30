import React, { useState } from "react";
import { SelectInputPlaceholder, SelectInputProps } from "./placeholder";
import { ActionSheetDataOption } from "@components/select/interface";
import { ActionSheetOptions, ActionSheetOptionsProps } from "@components/select/action_sheet_options";
import { useExtendedStyle } from "@hooks/extended_style_hook";


export interface PrimarySelectProps extends SelectInputProps, ActionSheetOptionsProps {
  options: ActionSheetDataOption[];
  onSelect?: (selected: ActionSheetDataOption) => void;
}

export const PrimarySelect: React.FC<PrimarySelectProps> = ({
  ...rest
}) => {
  const { primarySelect: props } = useExtendedStyle({ primarySelect: { 
    ...rest
  } });
  const [active, setActive] = useState<boolean>(false);

  return (
    <ActionSheetOptions
      placeholder={props?.placeholder}
      options={props?.options ?? []}
      editable={props?.editable}
      onSelect={props?.onSelect}
      onToggleSheet={(status) => setActive(status)}
      containerStyle={props?.containerStyle}
      renderPlaceholder={
        <SelectInputPlaceholder
          inputFocused={active}
          {...props}
        />
      }
    />
  );
};
