import { NavLink } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import SignupForm from "./SignupForm";
import PageTransition from "../Transitions/PageTransition";

export default function Signup({ onLogin }) {
  return (
    <PageTransition>
      <div id="root" className="h-auto lg:min-h-screen">
        <div className="fixed-background">
          <div className="ml-[5%]">
            <div className="grid lg:grid-cols-3 items-center">
              <div className="hidden md:block lg:col-span-2 px-10 mr-20 flex items-center justify-center">
                <div className="min-h-100 d-flex align-items-center w-[500px]">
                  <div>
                    <div>
                      <div className="mb-5">
                        <h1 className="text-white leading-none tracking-[2px]">
                          Empowering Nomads, One City at a Time
                        </h1>
                        <h4 className="text-white mt-3">
                          With Nomadic, one could unlock the secrets of living
                          expenses, uncover the hidden gems of each destination,
                          and make well-informed decisions about where to settle
                          down or venture next. From bustling metropolises to
                          serene havens, Nomadic's comprehensive data and
                          user-driven content empowered its users to create
                          their own destinies.
                        </h4>
                        <NavLink to="/" className="px-btn px-btn-theme mt-4">
                          Learn more
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[35%] flex items-center justify-center rounded-l-[30px] bg-white py-10 lg:mt-0 lg:col-span-1 lg:min-h-screen">
                <div className="">
                  <SignupForm onLogin={onLogin} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
