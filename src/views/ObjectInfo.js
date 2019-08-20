import React from "react";

export default function ObjectInfo(props) {
  return <div>This is an Object page for {props.match.params.number}</div>;
}

// POST REQUEST, receives Norad Number and returns an object.
// noradnumber => /objectInfo
const object_info = {
  object_name: "Name of Sat",
  object_origin: "russia",
  object_type: "satelitte",
  object_primary_purpose: "military",
  object_secondary_purpose: "communications",
  year_launched: "1987",
  norad_number: "12345",
  number_users_tracked: "77", // number of users that successfully tracked this object
  iod_count: "12000", // number of IODS that were submitted to create TLE for this object
  time_last_tracked: "1550398277", // timestamp
  address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
  username_last_tracked: "Leo Barhorst",
  observation_quality: 77,
  object_background:
    "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
  heavens_above_url: "https://filler.com"
};

// POST request
// /objectInfluence
// receives Norad Number and returns and array of objects
// I believe this lists the most influential users who have helped to create the latest TLE with an accurate sighting?
// Weight should add up to 100%
const object_influence = [
  {
    observation_time: "1550398277",
    username: "Leo Barhorst",
    user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a", // always needed as a fallback in event the user has not not created a username
    user_location: "Brooklyn, USA",
    quality: "34", // how is this calculated?
    time_difference: "1.42", // this will be a positive or negative number in seconds
    weight: "33" // a percentage value
  },
  {
    observation_time: "1550398277",
    username: "Jim Smith",
    user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    user_location: "Los Angeles, USA",
    quality: "45",
    time_difference: "1.42",
    weight: "33"
  },
  {
    observation_time: "1550398277",
    username: "Joe Bloggs",
    user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    user_location: "London, UK",
    quality: "34",
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
          quality: "34",
          time_difference: "1.42", // this will be a positive or negative number in seconds
          weight: "33" // a percentage value
        },
        {
          username: "Jim Smith",
          user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
          user_location: "Los Angeles, USA",
          quality: "34",
          time_difference: "1.42", // this will be a positive or negative number in seconds
          weight: "33" // a percentage value
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
const user_sightings = [
  {
    observation_time: "1550398277",
    username: "Leo Barhorst",
    user_location: "Brooklyn, USA",
    quality: "34",
    time_difference: "1.42",
    weight: "2"
  },
  {
    username: "Leo Barhorst",
    user_location: "Brooklyn, USA",
    quality: "34",
    time_difference: "1.42",
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
