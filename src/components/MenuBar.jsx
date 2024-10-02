import React from "react";
import styled from "styled-components";
import { AiOutlineDownload } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { RiFileAddFill } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";

const Container = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  background-color: white;
`;

const LeftSide = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Center = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DropDownList = styled.div`
  width: 60%;
  height: 50%;
  border: 3px solid lightgray;
`;

const DropDownButton = styled.button`
  width: auto;
  height: 50%;
  background-color: lightgray;
  border: none;
`;

const RightSide = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 2%;
  padding-right: 2%;
`;

const ButtonArea = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const MenuBar = () => {

  const handleLogin = () => {
    const scope = 'repo'; // GitHub 저장소에 대한 전체 접근 권한 요청
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_APP_GITHUB_CLIENT_ID}&redirect_uri=http://localhost:5173/callback&scope=${scope}`;
  };

  return (
    <Container>
      <LeftSide>
        <img
          style={{height: "80%"}} 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAA8FBMVEX/////0kI3c6X/00M3dKf/0EA3cKD/10j/1UU3d6z/2Ur/zj43dKb/zDv/yjk2bpw2a5c4erH/3U/E0d7M2uf/56r/6bR1ncL/zTP/5KT/4GiqvdBtkbKww9X/0Db/yS0ja6L//PMjbqcjZJX/5Inw9fkkcq4jYZL/xyT/3Uv/677/9uH/0S/g6fFGg7YjbKOBpsn/2Ff/2mv/3T7/8tP/1m//+ez/8cj/xBKgudRXi7lrlbxdi7V4m726zeHc5fD/3oCFoboUXIqcscZSfaE+cJn/553/6ZL/5HT/4V3/54VhirH/3pSPrMj/z1P/02HTJz5FAAAI2klEQVR4nO3dC1PiOhgGYBBaUBDxCKgotBa5CAUUUURYZNdz3JuX//9vTumF3pMGaJNO8s7s7gyDUp5J0q9tkk0kWFhYWFhYWFhYWFhYWFjISLO0mN7OngfHkpn9/efZ7XRRauI+OILSPJnOj1stqbWv5HjflnRakkQxPZsyMSX96XOr1TrWsu+RtJqhKM4vKPe6GKyhgFY62PwE9wHjy9QqBbVK5/NpMV/DfdB4srBTBbFK7+2JeRpb18xOFdBKifgN96FHnebxplZ7e8M8XSN98/h4Y6u9PX6PKq3nbawULZ4irQuzD7ak1R80KwVrjvsrRBfTSrrtry51nl1cYCtepKaEWKyx9l/0l6YSkpWihfMLRJlTA6vVX7/2ISFZ0dO0BobVh+VFNCue/xfb4UcbA0vqW160NK0gVnybkhPiGsv64kLysMr7WvGNEq7Djzbrbmh9sSQhWfENSq4R11jWnlSTkKz4xgLb8UcaHWtfsjaOGZoVZS1LkRmYr/UlNCu6sFY0klk7DGBWPE8vltbppFNt2HpBtqIJyygTJOm2triYu/qgf31FH5a1XFcfEKKNV/RiodWi9GGBqVxd0MuKZixkqyN6sdKOPgi3ohcL6TSoWVGLhWp1dEQTlmTLUItoDdSKGqwSPN+GECtqsALkYwixYlhmVCyQFcMyw7AQ8joEUxlY17a8Ta5wH/hWaZ5Mb2ezU3C+uTL3orJa6VgHmUwma0aWRxPc33jTNKeD1mrGqPUWg/5P2h3tBLg3HK5cYA3LwNKSMaJ43Y1xf+1N0rw15/ZBbjMEr0U9sSxW2WxKvsb9zdFzYZkGuXuro7beDZ1WSup3cRu6noNPQ97Eaj1mWbDWQ1cqGyst29S+MKyKayxnu1K1MrgBEBK6FQQrWx/hJggeNKv8BlZFs3TwsEql5DJug6CZhTxeKVYuLLuVovWIWyFYaiFbFVdp27GcVikuHh2xGYWVA8tllUzKsShOT6OwsmN5WCW5L9wQAdIPtRY1rGxYXlZK0+rhpoDnNBIrHSuT9bVK1sm/7GmGeD1osbJg+VglORm3BTRT+LLUXVgV2+qcUgXLz0ppWsTfrhlEY1Vsq1OdbVQOq2R9idkCFmN4D8PKjqXO7AJZcdwZbg1I9DVMoVsVi+rHySArjvTz4SySPqhEXc96JYOsuLMKbg5wpIistJPhWAZZcYQPWi9SNFbFH+rHVeogKy6XxMwBzkKKxqrxXf246xTIiuM6mDnA+XDujxKOVfGHNsvZZpVyWXEC0SP8LBqr9qv6acaQ5WeVOyO6LPXshDu3KuqLDfVe6GuVI/t0iL40fBOrov5psteAZbEiG6vpgbVzq8Z/+mqytzrEimysvhtr92P7pf5hekUKsCIbq4S65QCyVbu4Xkk+SsGsyMY6cWLt1qrRLl6sP0vrhECrnEAy1gJ1ewYnlTEVWckKRzdqrP6028XvlnXRXRluFSssmJUoivm/fy+D5PvriXWtfqISxCpOWGArUbys9eG/0jvXgazIxqpJQa3EfG3zjRkmGY/xKum2OowNFtjqAv7LfHJVuZM9zoPuhnV4SDbWIti2H+J8s1Z11Zucj+r1lEd95dEJ44MFtJpZf6ZX+fnr9z/uHNizej5Ylw2pYFZkY514bPvhshr+NX9g8ufm/saSgwP1rwPnxFr7U5ygVmRjldzLnd3jVX799srv+xtwe/KYMYpgRTbWS4Bl9KJRL4x/38P63pZWZGNpF9Jgq1f9vWVXq9q5FdlY6i0aSC2qv/Wnu1nt3IpsrNXNP4jVVHtjJFaEY9moPLeB1CqsSiRWhGPNIVa8VmJdRWN12CF6quTHEGylbwL5J/yxXcMieqVFbQi04htq3fAYes2gpSDg9gCmJAKt+KH6rjdXwwrJ6gEzBzhNEWjFa1c6EbWrgnCOmQOSAdBKVLdi6zl7IYoV6Gafw6pA9vhujPB+99sbavnevY/GqkD2vJBE4kQEWPEN9WToGLJCsxKWmDGgEUHPcbTK4fomdCutYRE9LWSVGeiZl4b16yYSK+J7YSKxEEHb1qpY1RtkK+iDHA8r4R23BTwiaNtaJ1aIVoWnGKw4/Bj6Wrmw3FaeCwg3siJ/eE+s6lJfqwBYO7MqPBF9XWjkduhn5cRCGdxRrTqEV+96mv77qtmxNrLyevDsYVX4xM0QMDXRx8qOtVEfdFt5tqtYjO5a5n77qlmxtmtXHMSK8KtCS5oi77NtrYm1IyvvPvhE9O1kR/qiz7a1a6xwrbq4AZDyInpZmVhhWgkFotdVeKTPD91WBpabandWwtMS81ffJJeiy8ofa1dWwtND3JqVllK+4bDyxXJZ1T1y5ozgSKfzeR6bisGV0jexYUtbnfBXvYFavZXPkdMdx+ICB5CXkwtr1P+iz9my3H1QjvvX3l2qMKtsXPZziiBVmBXDMlOFWbFuaKYKs0opAzws5/EsEZBThVmlUqCaQasTYnZJs3GqGXgtCr3ZJ9CGtYUVPVggq6A3kSnD2sqKHqzM9lZ0YW1pRRUWqtXhqmI4O6QSC9VK+KqMe5N3CxeFWAGtOrrM1ZdAHxaKlYJlmWj1WdCxOrRgZX2LUc+HqWdL82d7Hf0mMnVYwaxytl2wHgraDXdasO7QrHK2HTTLgvZwgpYx6y6wlYbFWX+4K+gTRinBWmaRrFwtq0ATVrmOZJXr2Mcsff5VnKYzbJGejPYw1Xo2fOwYWJS0rMQdoL7yuiC0LCv5XE/+oOS2cmIC3hLZffFsqeANrALerxBhRikkK0Xrq9t7HL8LaytahqyEdQPpoJM/CkKn0zGbFUUNy7EdawAr+2Q1ikYsNRN1W6eNrWg5FeoZ11PMKnCuRvJmVp3YTYPcRbqpOrqV8BSDxV6hpJySOSQrobOkeILNZCTX61zQCaOf55RPr7mqPKy2p8sBrBQnpcz6omXiDCS9yvVXXVbnyBwerqUKBXXKjFKNfi7L8VlfEkkex93y+3L0lcwpRis27nO0fC93xxSPUiwsLCwsLCwsLCwsLCyk5X8V8kHsRbjIBgAAAABJRU5ErkJggg==" 
        />
        <h1 style={{paddingLeft: "2%"}}>Python</h1>
      </LeftSide>
      <Center>
        <DropDownList />
        <DropDownButton>
          <IoMdArrowDropdown 
            fontSize={45}
          />
        </DropDownButton>
      </Center>
      <RightSide>
        <ButtonArea>
          <FaGithub  onClick={handleLogin} fontSize={50}/>GITHUB
        </ButtonArea>
        <ButtonArea>
          <FaCodePullRequest fontSize={50}/>PULL
        </ButtonArea>
        <ButtonArea>
          <AiOutlineDownload fontSize={50}/>SAVE
        </ButtonArea>
        <ButtonArea>
          <IoSettingsSharp fontSize={50}/>SETTING
        </ButtonArea>
        <ButtonArea>
          <RiFileAddFill fontSize={50}/>ADD
        </ButtonArea>
      </RightSide>
    </Container>
  );
};

export default MenuBar;