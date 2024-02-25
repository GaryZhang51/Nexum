import { FunctionComponent, useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import Tile from "./Tile";
import { Prisma } from "@prisma/client";

const Tiles: FunctionComponent = () => {
    const ctx = useContext(AppContext);
    const [tiles, setTiles] = useState<Prisma.PartnerUncheckedCreateInput[]>(
        []
    );
    useEffect(() => {
        fetch("localhost:3000/partners", {
            method: "POST",
            body: JSON.stringify({ search: ctx.filter.search }),
        }).then(async (res) => setTiles(await res.json()));
    }, [ctx.filter.search]);

    return (
        <div>
            {tiles.map((tile) => tile && <Tile key={tile.name} {...tile} />)}
        </div>
    );
};

export default Tiles;
