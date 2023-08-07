export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer bg-[#091D36] py-4">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-12 text-right md:text-right">
            <p className="m-0 text-white text-opacity-75">
              &copy; {year} Nomadic All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
