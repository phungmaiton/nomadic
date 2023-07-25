import { NavLink } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import LoginForm from "./LoginForm";

export default function Login({ user, setUser }) {
  return (
    <div id="root" className="h-auto lg:min-h-screen">
      <div className="fixed-background">
        <div className="ml-[5%]">
          <div className="grid lg:grid-cols-3 items-center">
            <div className="hidden md:block lg:col-span-2 px-10 mr-20 flex items-center justify-center">
              <div className="min-h-100 d-flex align-items-center">
                <div>
                  <div>
                    <div className="mb-5">
                      <h1 className="text-white">Hello</h1>
                      <h3 className="text-white">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[35%] flex items-center justify-center rounded-l-[30px] bg-white py-10 lg:mt-0 lg:col-span-1 lg:min-h-screen">
              <div className="">
                <LoginForm setUser={setUser} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
