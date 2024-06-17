import styled from "@emotion/native";
import { heightPixel, widthPixel } from "utils";

export const SelectPlanRender = styled.View({
    paddingHorizontal: widthPixel(21),
    maxHeight: heightPixel(250),
});

export const DecisionBar = styled.View({
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: heightPixel(17),
    paddingHorizontal: widthPixel(25),
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(196, 196, 196, 0.49)",
});

export const AndroidOptions = styled.TouchableOpacity<{
    selected: boolean;
}>(({ selected, theme }) => ({
    backgroundColor: selected ? theme.colors.primary : "rgba(106, 35, 129, 0.05)",
    paddingVertical: heightPixel(17),
    paddingHorizontal: widthPixel(25),
    borderRadius: widthPixel(10),
    marginTop: heightPixel(12),
}));

export const AndroidOptionsContainer = styled.View({
    paddingTop: heightPixel(8),
    paddingBottom: heightPixel(10),
});

export const ActionContainer = styled.View({
    width: "100%",
});

export const TitleBox = styled.View({});