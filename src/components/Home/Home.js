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
      <div className="container mx-auto px-10 mt-5">
        <h2>New Blog Posts</h2>
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
    </PageTransition>
  );
}
