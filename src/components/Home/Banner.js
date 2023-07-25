import { NavLink } from "react-router-dom";

/*--------------------
* Banner Section
----------------------*/
export default function Banner() {
  return (
    <>
      <section
        id="home"
        className="pt-[120px] pb-[80px] lg:pt-[170px] lg:pb-[100px] bg-gradient-1 relative overflow-hidden"
      >
        <div className="container mx-auto px-8">
          <div className="container relative z-[1]">
            <div className="grid gap-9 lg:grid-cols-12 grid-cols-1 items-center">
              <div className="lg:col-span-6">
                <div className="text-center lg:text-start mb-[50px] lg:mb-0">
                  <h1 className="text-[#373737] font-[600] text-[40px] lg:text-[60px] xl:text-[64px] leading-[1] mb-[25px] md:mb-[32px]">
                    Find the perfect playmates for your pets.
                  </h1>
                  <h6 className="text-[#373737] text-[15px] md:text-[16px] tracking-[2px] font-[600] mb-[20px] md:mb-[30px]">
                    Our furry friends need friends, too. That's why we made
                    PetPals - a platform that brings local pet owners together.
                  </h6>
                  <div>
                    <NavLink className="px-btn px-btn-theme " to="/meetups">
                      Find Meetups In Your Area
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="home-image text-center">
                  <img
                    src="https://i.guim.co.uk/img/media/03734ee186eba543fb3d0e35db2a90a14a5d79e3/0_173_5200_3120/master/5200.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=9c30ed97ea8731f3e2a155467201afe3"
                    title="Banner"
                    alt="Banner"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
