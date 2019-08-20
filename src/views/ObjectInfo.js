import React from "react";

export default function ObjectInfo(props) {
  return <div>This is an Object page for {props.match.params.number}</div>;
}

// POST REQUEST
// /objectInfo
// receives Norad Number and returns an object.
const object_info = {
  object_name: "Name of Sat",
  object_origin: "russia",
  object_type: "satelitte",
  object_primary_purpose: "military",
  object_secondary_purpose: "communications",
  year_launched: "1987",
  number_users_tracked: "77", // number of users that have successfully tracked this object
  oservation_count: "12000", // total number of observations that were submitted to create a TLE for this object from the beginning of collection records
  time_last_tracked: "1550398277", // timestamp
  address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
  username_last_tracked: "Leo Barhorst",
  observation_quality: 77, // This is our object confidence "rating", may utilize user rank and individual observation_quality for example
  object_background:
    "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
  heavens_above_url: "https://filler.com"
};

// POST request
// /objectInfluence
// receives Norad Number and returns and array of objects
// Lists the most influential users who have helped to create the LATEST TLE with an accurate sighting
// Weight should add up to 100%
// sorted by most influence
const object_influence = [
  {
    observation_time: "1550398277",
    username: "Leo Barhorst",
    user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a", // always needed as a fallback in event the user has not not created a username
    user_location: "Brooklyn, USA",
    observation_quality: "34", // quality/accuracy of the individual observastion
    time_difference: "1.42", // this will be a positive or negative number in seconds
    weight: "33" // a percentage value
  },
  {
    observation_time: "1550398277",
    username: "Jim Smith",
    user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    user_location: "Los Angeles, USA",
    observation_quality: "45",
    time_difference: "1.42",
    weight: "33"
  },
  {
    observation_time: "1550398277",
    username: "Joe Bloggs",
    user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    user_location: "London, UK",
    observation_quality: "20",
    time_difference: "1.42",
    weight: "33"
  }
];

// POST request
// /objectHistory
// receives Norad Number and Year and returns a object with a key of the given year
// each year will key into an object that has keys for each month in descending order
// each month will key into an object that has keys for each day (number) in descending order
// each day date will key into an array of objects for all observations of this given object
const object_history = {
  2019: {
    december: {
      5: [
        {
          username: "Leo Barhorst",
          user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
          user_location: "Brooklyn, USA",
          observation_quality: "34",
          observation_time_difference: "1.42", // this will be a positive or negative number in seconds
          observation_weight: "33" // a percentage value- observations from a time further back will in theory have a much lower observation_weight
        },
        {
          username: "Jim Smith",
          user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
          user_location: "Los Angeles, USA",
          observation_quality: "34",
          observation_time_difference: "1.42",
          observation_weight: "33"
        }
      ]
    },
    november: [{}],
    october: [{}],
    september: [{}],
    august: [{}],
    july: [{}],
    june: [{}],
    may: [{}],
    april: [{}],
    march: [{}],
    february: [{}],
    january: [{}]
  }
};

// POST request
// /objectUserSightings
// receives Norad Number and JWT and returns and array of objects
// sorted by most recent
const user_sightings = [
  {
    observation_time: "1550398277",
    username: "Leo Barhorst",
    user_location: "Brooklyn, USA",
    observation_quality: "34",
    observation_time_difference: "1.42",
    weight: "10" // The users most recent observations will in theory have a higher observation_weight %
  },
  {
    username: "Leo Barhorst",
    user_location: "Brooklyn, USA",
    observation_quality: "34",
    observation_time_difference: "1.42",
    weight: "1"
  },
  {
    username: "Leo Barhorst",
    user_location: "Brooklyn, USA",
    quality: "20",
    time_difference: "1.42",
    weight: "0"
  }
];

// POST request
// /objectMostSightings
// No design for this table present in Mikes figma file.
const most_sightings = {};
