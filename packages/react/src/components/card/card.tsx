import React from "react";
import { Card, CardBody, CardHeader, CardProps, Heading } from "@chakra-ui/react";

export interface PrimaryCardProps extends CardProps {

}

export const PrimaryCard: React.FC<PrimaryCardProps> = ({
  ...rest
}) => {
  // const { colors } = useThemeMode();

  return (
    <Card {...rest}>
      <CardHeader>
        <Heading size='md'>Client Report</Heading>
      </CardHeader>

      <CardBody>

      </CardBody>
    </Card>
  );
};
