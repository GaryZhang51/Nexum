"use client";
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
import { FunctionComponent, useContext, useState } from "react";
import { BsChevronDown, BsSearch } from "react-icons/bs";
import AppContext from "./AppContext";
import Tag from "./Tag";

const Sidebar: FunctionComponent = () => {
    const {
        filter: { search, setSearch, tags, setTags },
    } = useContext(AppContext);
    const [localSearch, setLocalSearch] = useState("");
    const [tagSearch, setTagSearch] = useState("");

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
                <TextFieldInput
                    placeholder="Search"
                    value={localSearch}
                    onChange={(e) => {
                        setLocalSearch(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        e.key === "Enter" && setSearch(localSearch);
                    }}
                />
            </TextFieldRoot>
            <Flex
                direction={"column"}
                gap={"4"}
                className="p-4 bg-[var(--slate-3)]"
            >
                <Heading>Filters</Heading>
                <TextFieldInput
                    placeholder="Add Tags"
                    value={tagSearch}
                    onChange={(e) => {
                        setTagSearch(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setTags([...tags, tagSearch]);
                            setTagSearch("");
                        }
                    }}
                />
                <Flex gap={"1"} wrap={"wrap"}>
                    {tags.map((name) => {
                        return <Tag key={name} {...{ name }} />;
                    })}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Sidebar;
