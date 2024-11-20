import Image from "next/image";

export default function Header() {
  return (
    <header className="p-4 text-white">
      <div className="flex items-center justify-center space-x-4 ">
        {/* Logo */}
        <Image width={40} height={40} src="/logo.png" alt="Logo" />

        {/* Title */}
        <h1 className="text-2xl font-bold">TaskMate</h1>
      </div>
    </header>
  );
}
