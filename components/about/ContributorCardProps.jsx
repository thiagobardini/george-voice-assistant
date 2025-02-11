import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaInstagram } from "react-icons/fa";

export function ContributorCard({ name, role, links }) {
  const iconClass = "w-5 h-5 hover:scale-110 transition-transform";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{role}</p>

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
