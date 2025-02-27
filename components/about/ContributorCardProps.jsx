import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaInstagram,
} from "react-icons/fa";
import React from "react";
import Image from "next/image";

export function ContributorCard({ name, role, links }) {
  const iconClass = "w-5 h-5 hover:scale-110 transition-transform";

  const defaultAvatar = "/contributors/default-avatar.png";
  let avatar = defaultAvatar;
  if (links.linkedin) {
    if (name.toLowerCase() === "harsh kumar") {
      avatar = "/contributors/harsh-kumar.png";
    }
    if (name.toLowerCase() === "thiago bardini") {
      avatar = "/contributors/thiago.jpg";
    }
    if (name.toLowerCase() === "brenda silva") {
      avatar = "/contributors/brenda.png";
    }
    if (name.toLowerCase() === "enyu rao") {
      avatar = "/contributors/enyu.png";
    }
    if (name.toLowerCase() === "george cheng") {
      avatar = "/contributors/george_cheng.png";
    }
    if (name.toLowerCase() === "alejandro ortiz") {
      avatar = "/contributors/alejandro.png";
    }
    if (name.toLowerCase() === "daniel rapoport") {
      avatar = "/contributors/daniel.png";
    }
    
    // Add more custom avatars here
  }

  return (
    <div className="p-4 border rounded shadow-sm flex items-center space-x-4">
      {/* Avatar */}
      <div className="w-16 h-16 relative">
        <Image
          src={avatar}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>

      <div>
        <h3 className="font-bold">{name}</h3>
        <p>{role}</p>
      </div>
      <div className="flex gap-4">
        {links.github && (
          <Link href={links.github} target="_blank">
            <FaGithub className={iconClass} />
          </Link>
        )}
        {links.linkedin && (
          <Link href={links.linkedin} target="_blank">
            <FaLinkedin className={iconClass} />
          </Link>
        )}
        {links.x && (
          <Link href={links.x} target="_blank">
            <FaTwitter className={iconClass} />
          </Link>
        )}
        {links.portfolio && (
          <Link href={links.portfolio} target="_blank">
            <FaGlobe className={iconClass} />
          </Link>
        )}
        {links.instagram && (
          <Link href={links.instagram} target="_blank">
            <FaInstagram className={iconClass} />
          </Link>
        )}
        {links.join && (
          <Link href={links.join} className="text-blue-600 hover:underline">
            Join Us →
          </Link>
        )}
      </div>
    </div>
  );
}
