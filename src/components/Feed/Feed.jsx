import React, { useEffect, useState } from "react";
import "./Feed.css";
import { API_KEY, value_converter } from "../../Data.js";
import { Link } from "react-router-dom";
import moment from "moment";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const VideoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=99&regionCode=US&videoCategoryId=${category}&key=${API_KEY}
`;
    await fetch(VideoList_url)
      .then((response) => response.json())
      .then((data) => setData(data.items));
  };
  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((item, index) => {
        console.log(item.contentDetails.duration);
        return (
          <Link
            to={`video/${item.snippet.categoryID}/${item.id}`}
            className="card"
            key={index}
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {value_converter(item.statistics.viewCount)} views &bull;
              {moment(item.snippet.publishedAt).fromNow()}{" "}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;
