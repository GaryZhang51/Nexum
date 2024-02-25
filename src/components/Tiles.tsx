
import { FunctionComponent } from "react";
import { Badge } from "@radix-ui/themes";
import { BsLink } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { BsPinMap } from "react-icons/bs";
import { Button, Flex, Text, TextFieldInput, DialogRoot, DialogClose, DialogContent, DialogDescription, DialogTrigger, DialogTitle } from "@radix-ui/themes";

import ycf from '../assets/ycf.png'

const Tiles: FunctionComponent = () => {
    return (
        <DialogRoot>
            <DialogTrigger>
                <div className="p-16">
                    <div className="shadow w-64 h-64 rounded-lg">
                        <div className={`h-1/2 bg-cover bg-center rounded-t-lg`} style={{ backgroundImage: `url('${ycf.src}')`}}></div>
                        <div className="px-4 py-1 w-full">
                            <h2 className="font-bold text-md mt-2">Youth Creativity Fund</h2>
                            <p className="text-xs mb-1">Offers grants of up to $1000 for students to pursue a creative learning project.</p>
                            <div className="flex justify-between">
                                <Badge color="green">Students</Badge>
                                <div className="flex gap-1">
                                    <MdOutlineEmail size={20} />
                                    <BsLink size={20} />
                                    <BsPinMap />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="m-w-[600px] flex flex-col gap-4 !bg-[#555]">
                <div className="flex gap-4">
                    <div className="w-1/3 flex flex-col gap-4 bg-[#EEE] rounded p-3 min-h-[150px]">
                        <div className={`w-full flex-1 bg-cover bg-center rounded-lg`} style={{ backgroundImage: `url('${ycf.src}')`}}></div>
                        <DialogTitle>Youth Creativity Fund</DialogTitle>
                    </div>
                    <div className="w-2/3 p-3 bg-[#EEE] rounded">
                        <DialogDescription className="!text-sm">
                            The Youth Creativity Fund fosters creative confidence by connecting creative ideas, designed by students, with donations from people passionate about seeing youth creativity flourish. After all: creative confidence is built through having the opportunity to try, experiment, fail… and succeed.
                        </DialogDescription>
                    </div>
                </div>
                <div className="flex gap-4">
                    <textarea className="bg-[#EEE] rounded p-4 focus:outline-none resize-none block m-0" placeholder="Type notes here...  "></textarea>
                    <div className="flex-1 bg-[#EEE] rounded p-4">
                        <div className="flex items-center gap-2">
                            <MdOutlineEmail size={20} />
                            hello@youthcreativityfund.ca
                        </div>
                        <div className="flex items-center gap-2">
                            <BsLink size={20} />
                            <a href="https://youthcreativityfund.ca">https://youthcreativityfund.ca</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <BsPinMap />
                            74 Queen St. N, Unit B, Kitchener, ON N2H 2H3
                        </div>
                    </div>
                </div>
            </DialogContent>
            
        </DialogRoot>
    )
};

export default Tiles;
