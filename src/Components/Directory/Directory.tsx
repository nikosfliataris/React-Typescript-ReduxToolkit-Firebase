import React, { FC, useRef, useState } from "react";
import "./Directory.scss";
import { INITIAL_STATE } from "./../../Directory";
import MenuItem from "../MenuItem/MenuItem";

interface Props {
  State: SubProps[];
}
interface SubProps {
  title: string;
  imageUrl: string;
  id: number;
  linkUrl: string;
  size?: string | undefined;
}

const Directory: FC<Props> = () => {
  const [section, setSection] = useState(INITIAL_STATE);
  console.log(section);

  return (
    <div className="directory-menu">
      {section.map((items) => (
        <MenuItem
          title={items.title}
          key={items.id}
          id={items.id}
          imageUrl={items.imageUrl}
          size={items.size}
          linkUrl={items.linkUrl}
        />
      ))}
    </div>
  );
};

export default Directory;
