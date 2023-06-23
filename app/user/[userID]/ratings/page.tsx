import Link from 'next/link';

export default async function Ratings() {
  return (
    <div className="text-2xl">
      <div className="flex flex-row justify-end text-2xl md:w-1/3 text-2xl mt-5">
        <Link href="/user/123/profile"> My Profile</Link>
      </div>
      <h1 className="relative sm:inset-x-20 inset-y-4 text-5xl">My Ratings</h1>
      <div className="relative sm:inset-10 md:w-1/3">
        <div className="inline-block">
          <label>Rate this class</label>
          <form>
            <input name="rating" type="radio" value="1"></input>
            <label>1</label>
            <input name="rating" type="radio" value="2"></input>
            <label>2</label>
            <input name="rating" type="radio" value="3"></input>
            <label>3</label>
          <input name="rating" type="radio" value="4"></input>
            <label>4</label>
          <input name="rating" type="radio" value="5"></input>
            <label>5</label>
          <button className="ml-5 rounded-lg border-black border-2">Submit</button>
        </form>
        </div>
        <br></br>
        <div className="inline-block">
          <label>Rate this class</label>
          <form>
            <input name="rating" type="radio" value="1"></input>
            <label>1</label>
            <input name="rating" type="radio" value="2"></input>
            <label>2</label>
            <input name="rating" type="radio" value="3"></input>
            <label>3</label>
          <input name="rating" type="radio" value="4"></input>
            <label>4</label>
          <input name="rating" type="radio" value="5"></input>
            <label>5</label>
          <button className="ml-5 rounded-lg border-black border-2">Submit</button>
        </form>
        </div>
        <br></br>
        <div className="inline-block">
          <label>Rate this class</label>
          <form>
            <input name="rating" type="radio" value="1"></input>
            <label>1</label>
            <input name="rating" type="radio" value="2"></input>
            <label>2</label>
            <input name="rating" type="radio" value="3"></input>
            <label>3</label>
          <input name="rating" type="radio" value="4"></input>
            <label>4</label>
          <input name="rating" type="radio" value="5"></input>
            <label>5</label>
          <button className="ml-5 rounded-lg border-black border-2">Submit</button>
        </form>

        </div>
        <br></br>
      </div>
      <div className="relative sm:inset-10 flex sm:place-content-between md:w-1/3">
        <Link href="/user/123/favorites"> My Schedule</Link>
        <Link href="/user/123/classes"> Classes</Link>
        <Link href="/user/123/favorites"> My Favorites</Link>
      </div>
    </div>
  );
}
