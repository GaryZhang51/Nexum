
import { FunctionComponent } from "react";
import { Badge } from "@radix-ui/themes";
import { BsLink } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { BsPinMap } from "react-icons/bs";

import ycf from '../assets/ycf.png'

const Tiles: FunctionComponent = () => {
    return (
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
    )
};

export default Tiles;
