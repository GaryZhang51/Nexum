"use client";
import { Badge, Button } from "@radix-ui/themes";
import { FunctionComponent, useContext } from "react";
import { BsX } from "react-icons/bs";
import AppContext from "./AppContext";

interface TagProps {
    name: string;
}

const Tag: FunctionComponent<TagProps> = ({ name }) => {
    const {
        filter: { tags, setTags },
    } = useContext(AppContext);

    return (
        <Badge color="red">
            <span className="mr-2">{name}</span>
            <Button
                size={"1"}
                variant="ghost"
                onClick={() => {
                    setTags(tags.filter((x) => x !== name));
                }}
            >
                <BsX />
            </Button>
        </Badge>
    );
};

export default Tag;
