import { FunctionComponent } from "react";
import { Badge } from "@radix-ui/themes";
import { BsLink, BsPhone } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { BsPinMap } from "react-icons/bs";
import {
    Button,
    Flex,
    Text,
    TextFieldInput,
    DialogRoot,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTrigger,
    DialogTitle,
} from "@radix-ui/themes";

import ycf from "../assets/ycf.png";

interface TileProps {
    name: string;
    img?: string | undefined | null;
    description: string;
    tags: string;
    notes?: string | undefined | null;
    email?: string | undefined | null;
    location?: string | undefined | null;
    website?: string | undefined | null;
    phone?: string | undefined | null;
}

const Tile: FunctionComponent<TileProps> = ({
    name,
    img,
    description,
    tags,
    notes,
    email,
    location,
    website,
    phone,
}) => {
    return (
        <DialogRoot>
            <DialogTrigger>
                <div className="p-16">
                    <div className="shadow w-64 h-64 rounded-lg">
                        <div
                            className={`h-1/2 bg-cover bg-center rounded-t-lg`}
                            style={{ backgroundImage: `url('${img}')` }}
                        ></div>
                        <div className="px-4 py-1 w-full">
                            <h2 className="font-bold text-md mt-2">{name}</h2>
                            <p className="text-xs mb-1">{description}</p>
                            <div className="flex justify-between">
                                {tags.split(" ").map((tag) => (
                                    <Badge color="green" key={tag}>
                                        {tag}
                                    </Badge>
                                ))}
                                <div className="flex gap-1">
                                    {email && <MdOutlineEmail size={20} />}
                                    {website && <BsLink size={20} />}
                                    {phone && <BsPhone size={20} />}
                                    {location && <BsPinMap />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="m-w-[600px] flex flex-col gap-4 !bg-[#555]">
                <div className="flex gap-4">
                    <div className="w-1/3 flex flex-col gap-4 bg-[#EEE] rounded p-3 min-h-[150px]">
                        <div
                            className={`w-full flex-1 bg-cover bg-center rounded-lg`}
                            style={{ backgroundImage: `url('${img}')` }}
                        ></div>
                        <DialogTitle>{name}</DialogTitle>
                    </div>
                    <div className="w-2/3 p-3 bg-[#EEE] rounded">
                        <DialogDescription className="!text-sm">
                            {description}
                        </DialogDescription>
                    </div>
                </div>
                <div className="flex gap-4">
                    <textarea
                        className="bg-[#EEE] rounded p-4 focus:outline-none resize-none block m-0"
                        placeholder="Type notes here...  "
                        value={notes ?? ""}
                    ></textarea>
                    <div className="flex-1 bg-[#EEE] rounded p-4">
                        {email && (
                            <div className="flex items-center gap-2">
                                <MdOutlineEmail size={20} />
                                {email}
                            </div>
                        )}
                        {website && (
                            <div className="flex items-center gap-2">
                                <BsLink size={20} />
                                <a href="https://youthcreativityfund.ca">
                                    {website}
                                </a>
                            </div>
                        )}
                        {phone && (
                            <div className="flex items-center gap-2">
                                <BsPhone size={20} />
                                {phone}
                            </div>
                        )}
                        {location && (
                            <div className="flex items-center gap-2">
                                <BsPinMap />
                                {location}
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </DialogRoot>
    );
};

export default Tile;
