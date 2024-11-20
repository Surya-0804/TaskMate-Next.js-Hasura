import Image from "next/image";

export default function Header() {
  return (
    <header className="p-4 text-white">
      <div className="flex items-center justify-center space-x-4 ">
        {/* Logo */}
        <Image width={55} height={55} src="/to-do.png" alt="Logo" />

        {/* Title */}
        <h1 className="text-2xl font-bold">TaskMate</h1>
      </div>
    </header>
  );
}
