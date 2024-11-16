import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-[#1C1564] px-4 py-2 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <img
          src="https://scontent.fblr21-1.fna.fbcdn.net/v/t39.30808-6/301567810_437071411774709_5221868916154293987_n.png?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Hbnhfkss5xYQ7kNvgFQVPu1&_nc_zt=23&_nc_ht=scontent.fblr21-1.fna&_nc_gid=AiTvjAkBESFfpRCfcelLhPA&oh=00_AYBJdEEf7sa1CQn5zApUkOH0RCN0L4lbL4RkN5OQvIJ6aw&oe=673ECAC5"
          alt="Logo"
          className="w-fit h-14 rounded-md"
        />
        <nav className="space-x-9">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
