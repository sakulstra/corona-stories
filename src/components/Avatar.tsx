import React from "react";
import Avatar, { AvatarProps } from "@material-ui/core/Avatar";

export default function CustomAvatar(props: AvatarProps) {
  return (
    <Avatar
      {...props}
      variant="rounded"
      src="https://www.thispersondoesnotexist.com/image"
    />
  );
}
