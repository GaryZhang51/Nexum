import {
    Avatar,
    Box,
    Button,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    Flex,
    Heading,
    TextFieldInput,
    TextFieldRoot,
    TextFieldSlot,
} from "@radix-ui/themes";
import { FunctionComponent } from "react";
import { BsChevronDown, BsSearch } from "react-icons/bs";

const Sidebar: FunctionComponent = () => {
    return (
        <Flex
            direction={"column"}
            wrap={"nowrap"}
            justify={"start"}
            gap={"8"}
            className="p-8 w-1/4 bg-primary-3"
        >
            <DropdownMenuRoot>
                <DropdownMenuTrigger>
                    <Button variant="solid" size="4">
                        <div className="flex justify-between items-center w-full">
                            <Avatar fallback="E" color="ruby" />
                            <span>Mike Wazowski</span>
                            <BsChevronDown />
                        </div>
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenuRoot>
            <TextFieldRoot size={"3"}>
                <TextFieldSlot>
                    <BsSearch />
                </TextFieldSlot>
                <TextFieldInput placeholder="Search" />
            </TextFieldRoot>
            <Box className="p-4 bg-[var(--slate-3)]">
                <Heading>Filters</Heading>
                <TextFieldInput placeholder="Add Tags" />
            </Box>
        </Flex>
    );
};

export default Sidebar;
