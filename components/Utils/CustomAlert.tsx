import React from "react";
import {
  Alert,
  Box,
  IconButton,
  CloseIcon,
  HStack,
  VStack,
  Text,
  Collapse,
} from "native-base";
interface Props {
  text: string;
  title?: string;
  isOpen?: boolean;
}
const CustomAlert: React.FC<Props> = (props) => {
  const [show, setShow] = React.useState(props.isOpen);
  if (!show) return null;
  return (
    <Box>
      <Collapse isOpen={show}>
        <Alert flexWrap="wrap" w="100%" status="error">
          <VStack flexWrap="wrap" space={1} w="100%">
            <HStack alignItems="center" justifyContent="space-between">
              <HStack flexWrap="wrap" space={2} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  _dark={{
                    color: "coolGray.800",
                  }}
                >
                  {props.text}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Alert>
      </Collapse>
    </Box>
  );
};

export default CustomAlert;
