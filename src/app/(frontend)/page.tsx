import Image from "next/image";
import Header from "./components/Header";
import MessageUs from "./components/MessageUs";
import InteractiveMap from "./components/InteractiveMap";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative">
      <div className="relative min-h-screen">
        <Image
          src="/mainBg.jpg"
          fill
          alt="Home Hero Image"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#000000] opacity-55"></div>
        <div className="absolute top-0 left-0 w-full z-10">
          <Header />
        </div>
        <div className="absolute left-10 top-1/2 transform -translate-y-1/2 z-20">
          <div className="flex flex-col items-start w-[858px]">
            <div className="w-[693px] text-white font-['PlayfairDisplay'] text-[4rem] leading-[110%]">
              We simply understand corporate aviation <br />
              inside out
            </div>
            <div className="flex justify-center items-center gap-3 py-3 px-6 h-14 bg-white mt-4">
              <div className="flex flex-col justify-center w-[16.1875rem] h-5 text-[#2e2e2e] font-['Montserrat'] font-medium leading-[120%] text-base uppercase">
                all Solutions and services
              </div>
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.44616 16.3362L12.2099 10.4799C12.3363 10.3522 12.4072 10.1797 12.4072 9.99994C12.4072 9.8202 12.3363 9.64772 12.2099 9.51994L6.44741 3.66244C6.32107 3.53387 6.25027 3.36082 6.25027 3.18057C6.25027 3.00031 6.32107 2.82726 6.44741 2.69869C6.50914 2.63538 6.58291 2.58507 6.66438 2.55071C6.74585 2.51636 6.83337 2.49866 6.92179 2.49866C7.01021 2.49866 7.09773 2.51636 7.1792 2.55071C7.26067 2.58507 7.33444 2.63538 7.39616 2.69869L13.1587 8.55369C13.5373 8.93934 13.7495 9.45822 13.7495 9.99869C13.7495 10.5392 13.5373 11.058 13.1587 11.4437L7.39616 17.2987C7.33442 17.3622 7.26058 17.4127 7.17899 17.4471C7.0974 17.4816 7.00973 17.4994 6.92116 17.4994C6.8326 17.4994 6.74492 17.4816 6.66334 17.4471C6.58175 17.4127 6.5079 17.3622 6.44616 17.2987C6.31982 17.1701 6.24902 16.9971 6.24902 16.8168C6.24902 16.6366 6.31982 16.4635 6.44616 16.3349"
                  fill="#2E2E2E"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 z-20">
          <div className="flex flex-col flex-shrink-0 justify-center items-center gap-3 w-28 h-[417px]">
            <div className="w-px h-40 bg-white" />
            <svg
              width={74}
              height={73}
              viewBox="0 0 74 73"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40.7562 9.90669C41.2489 10.403 41.6389 10.9916 41.9041 11.6388C42.1692 12.2859 42.3042 12.979 42.3014 13.6784V30.0669L60.2989 37.7957C60.4956 37.8742 60.6724 37.9954 60.8165 38.1506C60.9607 38.3058 61.0685 38.4911 61.1323 38.693L62.7109 43.3924C62.7947 43.6529 62.8078 43.9311 62.7488 44.1983C62.6899 44.4656 62.561 44.7124 62.3753 44.9135C62.1897 45.1146 61.954 45.2628 61.6923 45.3429C61.4306 45.423 61.1523 45.4322 60.8859 45.3695L42.3318 40.7036L41.4375 56.6571L44.9932 59.3186V64.6354C42.3208 63.9283 39.6512 63.2105 36.9845 62.4819C36.9845 62.4819 33.7208 63.3792 29.0062 64.6354V59.3186L32.565 56.6571L31.6646 40.7036L13.1135 45.3725C12.8473 45.4342 12.5694 45.4243 12.3082 45.3439C12.047 45.2634 11.8118 45.1152 11.6264 44.9144C11.441 44.7136 11.3121 44.4672 11.2528 44.2004C11.1934 43.9337 11.2057 43.6559 11.2885 43.3954L12.8671 38.693C12.9309 38.4911 13.0388 38.3058 13.1829 38.1506C13.327 37.9954 13.5038 37.8742 13.7006 37.7957L31.6981 30.0669V13.6784C31.6952 12.979 31.8302 12.2859 32.0954 11.6388C32.3605 10.9916 32.7506 10.403 33.2433 9.90669C34.2448 8.92032 35.594 8.36743 36.9997 8.36743C38.4054 8.36743 39.7547 8.92032 40.7562 9.90669Z"
                stroke="white"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="w-px h-40 bg-white" />
          </div>
        </div>
        <div className="absolute bottom-10 right-24 z-20">
          <MessageUs />
        </div>
      </div>
      <InteractiveMap />
      <Footer />
    </div>
  );
}
