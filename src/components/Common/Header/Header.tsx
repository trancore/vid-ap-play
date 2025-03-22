export default function Header(): JSX.Element {
  return (
    <header className="sticky top-0 flex bg-gray-500 px-4 py-8">
      <div className="flex">
        <img src="/vid-ap-play.svg" className="size-8"></img>
        <h1 className="text-3xl">VidApPlay</h1>
      </div>
    </header>
  )
}
