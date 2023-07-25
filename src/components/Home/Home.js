import Banner from "./Banner";
import PageTransition from "../Transitions/PageTransition";
import BarLoader from "react-spinners/BarLoader";
import { useState } from "react";

export default function Home({ isLoading }) {
  return (
    <PageTransition>
      <div>
        <Banner />
      </div>
      <section className="pt-[50px] pb-[50px] lg:pt-[100px] lg:pb-[100px] relative overflow-hidden">
        <div className="container mx-auto px-10">
          <h2>Upcoming Meetups</h2>
          {/* <div className="column-div pt-5">
            {isLoading ? (
              <BarLoader color="#87AF73" />
            ) : (
              sorted_meetups.map((meetup) => (
                <MeetupItemsHome
                  key={meetup.id}
                  title={meetup.title}
                  details={meetup.details}
                  image={meetup.image}
                  id={meetup.id}
                />
              ))
            )}
          </div> */}
        </div>
      </section>
    </PageTransition>
  );
}
