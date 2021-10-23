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
  title: string;
  isOpen: boolean;
}
const CustomAlert: React.FC<Props> = (props) => {
  const [show, setShow] = React.useState(props.isOpen);
  if (!show) return null;
  return (
    <Box h="60" w="75%">
      <Collapse isOpen={show}>
        <Alert w="100%" status="error">
          <VStack space={1} w="100%">
            <HStack alignItems="center" justifyContent="space-between">
              <HStack space={2} alignItems="center">
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
              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" color="coolGray.600" />}
                onPress={() => setShow(false)}
              />
            </HStack>
          </VStack>
        </Alert>
      </Collapse>
    </Box>
  );
};

export default CustomAlert;
