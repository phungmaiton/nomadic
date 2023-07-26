import { NavLink } from "react-router-dom";

/*--------------------
* Banner Section
----------------------*/
export default function Banner() {
  return (
    <>
      <section
        id="home"
        className="pt-[120px] pb-[20px] lg:pt-[170px] lg:pb-[100px] banner relative overflow-hidden"
      >
        <div className="mx-auto">
          <div className="container relative z-[1]">
            <div className="grid gap-9 lg:grid-cols-12 grid-cols-1 items-center">
              <div className="lg:col-span-7">
                <div className="sm:text-left lg:text-left mb-[50px] lg:mb-0">
                  <h1 className="text-[#373737] font-[600] text-[40px] lg:text-[60px] xl:text-[64px] leading-[1] mb-[25px] md:mb-[32px]">
                    Discover Your Next Home with Nomadic
                  </h1>
                  <h6 className="text-[#373737] text-[15px] md:text-[16px] tracking-[2px] font-[600] mb-[20px] md:mb-[30px]">
                    Embark on a journey of discovery and compare living expenses
                    worldwide with Nomadic – your passport to embracing new
                    horizons.
                  </h6>
                  <div>
                    <NavLink className="px-btn px-btn-theme " to="/meetups">
                      Explore
                    </NavLink>
                  </div>
                </div>
              </div>
              {/* <div className="lg:col-span-5">
                <div className="home-image text-center">
                  <img
                    src="https://i.guim.co.uk/img/media/03734ee186eba543fb3d0e35db2a90a14a5d79e3/0_173_5200_3120/master/5200.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=9c30ed97ea8731f3e2a155467201afe3"
                    title="Banner"
                    alt="Banner"
                    className="rounded-lg"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
