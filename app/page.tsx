"use client"

import { useMemo, useState } from "react"

const restaurants = [
  {
    id: 1,
    name: "JJ's POKE & CAFE 2号店",
    distanceMin: 6,
    isOpen: true,
    rating: 4.1,
    category: "健康餐",
    tags: ["高蛋白", "低負擔", "台大附近"],
    reason: "符合健康餐需求，距離近，現在也有營業",
    address: "臺北市大安區辛亥路二段附近",
    hours: "11:00 - 20:30",
    description: "主打健康餐盒與高蛋白搭配，適合下課後快速吃一餐。",
    menu: [
      {
        name: "雞肉沙拉飯",
        health: 9,
        popularity: 8,
        description: "高蛋白、較低油脂，是店內很穩定的熱門選擇。",
      },
      {
        name: "美乃滋沙拉飯",
        health: 4,
        popularity: 9,
        description: "口味受歡迎，但油脂與熱量相對較高。",
      },
      {
        name: "沙拉碗",
        health: 10,
        popularity: 6,
        description: "最清爽的選項，蔬菜比例高。",
      },
    ],
  },
  {
    id: 2,
    name: "RUFOUS COFFEE ROASTERS",
    distanceMin: 8,
    isOpen: true,
    rating: 4.4,
    category: "咖啡廳",
    tags: ["可久坐", "安靜", "甜點"],
    reason: "適合聊天或讀書，氣氛輕鬆，離你不遠",
    address: "台北市中正區羅斯福路四段巷內",
    hours: "10:00 - 22:00",
    description: "店內安靜，有插座和甜點，很適合和朋友久坐聊天或讀書。",
    menu: [
      {
        name: "優格水果碗",
        health: 8,
        popularity: 6,
        description: "相對清爽，甜度較低，適合想吃點東西但不想太負擔。",
      },
      {
        name: "拿鐵",
        health: 6,
        popularity: 9,
        description: "店內很受歡迎的飲品，適合搭配工作或聊天。",
      },
      {
        name: "起司蛋糕",
        health: 3,
        popularity: 10,
        description: "人氣很高，但甜度與熱量都偏高。",
      },
    ],
  },
  {
    id: 3,
    name: "二八麵堂",
    distanceMin: 4,
    isOpen: false,
    rating: 4.2,
    category: "平價",
    tags: ["快速解決", "晚餐", "便宜"],
    reason: "價格親民又近，但目前已休息",
    address: "台北市大安區溫州街附近",
    hours: "11:30 - 14:00 / 17:00 - 20:00",
    description: "平價、上菜快，適合趕時間時快速解決一餐。",
    menu: [
      {
        name: "滷肉飯",
        health: 5,
        popularity: 9,
        description: "經典熱門品項，方便快速。",
      },
      {
        name: "燙青菜",
        health: 9,
        popularity: 6,
        description: "最清爽的配菜選項，營養表現較好。",
      },
      {
        name: "雞腿便當",
        health: 6,
        popularity: 8,
        description: "份量夠，也相對有飽足感。",
      },
    ],
  },
  {
    id: 4,
    name: "Doki Poke 夏威夷蒸鮮飯 台大社科店",
    distanceMin: 10,
    isOpen: true,
    rating: 4.5,
    category: "健康餐",
    tags: ["沙拉", "清爽", "午晚餐"],
    reason: "適合想吃清爽一點的時候，選擇也很多",
    address: "台北市大安區辛亥路二段附近",
    hours: "11:00 - 21:00",
    description: "可自由搭配沙拉與蛋白質，適合偏好清爽、客製化飲食的人。",
    menu: [
      {
        name: "雞肉沙拉",
        health: 10,
        popularity: 7,
        description: "高蛋白又清爽，是最平衡的選擇之一。",
      },
      {
        name: "煙燻鮭魚沙拉",
        health: 9,
        popularity: 8,
        description: "人氣高、整體也相對健康。",
      },
      {
        name: "酪梨蔬菜碗",
        health: 9,
        popularity: 6,
        description: "口感豐富，適合喜歡蔬菜與健康脂肪的人。",
      },
    ],
  },
  {
    id: 5,
    name: "阿薄郎薄皮餃子－公館店",
    distanceMin: 12,
    isOpen: true,
    rating: 4.1,
    category: "宵夜",
    tags: ["熱食", "晚餐", "份量足"],
    reason: "比較適合晚上想吃熱的、份量夠的一餐",
    address: "台北市中正區汀州路三段附近",
    hours: "17:00 - 00:30",
    description: "偏向晚餐和宵夜時段，適合想吃熱食、份量足一點的人。",
    menu: [
      {
        name: "牛肉麵",
        health: 6,
        popularity: 9,
        description: "很受歡迎，熱食也有滿足感。",
      },
      {
        name: "炸雞拼盤",
        health: 3,
        popularity: 10,
        description: "超熱門，但油炸比例高。",
      },
      {
        name: "清燉蔬菜湯麵",
        health: 8,
        popularity: 6,
        description: "相對清爽，適合想吃熱食又不想太油的人。",
      },
    ],
  },
]

const preferences = ["全部", "健康餐", "咖啡廳", "平價", "宵夜"]
const radiusOptions = [5, 10, 15]

type Restaurant = (typeof restaurants)[number]
type MenuItem = Restaurant["menu"][number]

function getDishScore(item: MenuItem) {
  return item.health * 0.6 + item.popularity * 0.4
}

function getBestDish(menu: MenuItem[]) {
  return menu.reduce((best, item) => {
    return getDishScore(item) > getDishScore(best) ? item : best
  })
}

export default function Home() {
  const [selectedPreference, setSelectedPreference] = useState("全部")
  const [openNowOnly, setOpenNowOnly] = useState(false)
  const [radius, setRadius] = useState(15)
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchPreference =
        selectedPreference === "全部" ||
        restaurant.category === selectedPreference

      const matchOpenNow = !openNowOnly || restaurant.isOpen
      const matchDistance = restaurant.distanceMin <= radius

      return matchPreference && matchOpenNow && matchDistance
    })
  }, [selectedPreference, openNowOnly, radius])

  const bestDish = selectedRestaurant ? getBestDish(selectedRestaurant.menu) : null

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-8">
        <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-sm">
          <p className="text-sm text-white/80">台大附近餐廳推薦 prototype</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            現在想吃什麼？
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90 md:text-base">
            根據你的位置、飲食偏好、步行範圍和是否營業中，快速推薦台大附近適合的餐廳。
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur-sm">
              <p className="text-xs text-white/75">目前位置</p>
              <p className="mt-1 font-medium">台大校總區附近</p>
            </div>

            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur-sm">
              <p className="text-xs text-white/75">步行範圍</p>
              <p className="mt-1 font-medium">{radius} 分鐘內</p>
            </div>

            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur-sm">
              <p className="text-xs text-white/75">結果數量</p>
              <p className="mt-1 font-medium">{filteredRestaurants.length} 間</p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-neutral-200 md:p-5">
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm font-medium text-neutral-900">想吃什麼類型？</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {preferences.map((item) => {
                  const active = selectedPreference === item
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedPreference(item)}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        active
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      }`}
                    >
                      {item}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-neutral-900">步行範圍</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {radiusOptions.map((item) => {
                  const active = radius === item
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setRadius(item)}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        active
                          ? "bg-emerald-600 text-white"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      }`}
                    >
                      {item} 分鐘
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3 ring-1 ring-neutral-200">
              <div>
                <p className="text-sm font-medium text-neutral-900">只看營業中</p>
                <p className="text-xs text-neutral-500">
                  開啟後只顯示目前還有營業的店家
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpenNowOnly((prev) => !prev)}
                className={`relative h-7 w-12 rounded-full transition ${
                  openNowOnly ? "bg-emerald-500" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    openNowOnly ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900">推薦結果</h2>
            <p className="text-sm text-neutral-500">
              {selectedPreference} · {radius} 分鐘內 · {openNowOnly ? "只看營業中" : "包含全部"}
            </p>
          </div>

          <div className="space-y-4">
            {filteredRestaurants.map((restaurant) => (
              <article
                key={restaurant.id}
                className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-neutral-200 transition hover:shadow-md"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-xl">
                        🍽️
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-semibold text-neutral-900">
                            {restaurant.name}
                          </h3>
                          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
                            {restaurant.category}
                          </span>
                        </div>

                        <p className="mt-1 text-sm text-neutral-500">
                          步行 {restaurant.distanceMin} 分鐘 · 評分 {restaurant.rating}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {restaurant.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 rounded-2xl bg-neutral-50 px-4 py-3">
                      <p className="text-sm leading-6 text-neutral-600">
                        <span className="font-medium text-neutral-800">推薦原因：</span>
                        {restaurant.reason}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:flex-col md:items-end">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        restaurant.isOpen
                          ? "bg-green-100 text-green-700"
                          : "bg-neutral-200 text-neutral-600"
                      }`}
                    >
                      {restaurant.isOpen ? "營業中" : "已休息"}
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedRestaurant(restaurant)}
                      className="rounded-full bg-neutral-900 px-4 py-2 text-sm text-white transition hover:bg-neutral-800"
                    >
                      查看詳情
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {filteredRestaurants.length === 0 && (
              <div className="rounded-[24px] bg-white p-8 text-center shadow-sm ring-1 ring-neutral-200">
                <p className="text-lg font-medium text-neutral-900">找不到符合條件的餐廳</p>
                <p className="mt-2 text-sm text-neutral-500">
                  可以試著放寬步行範圍，或先關閉「只看營業中」。
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {selectedRestaurant && bestDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[28px] bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-neutral-500">餐廳詳情</p>
                <h2 className="mt-1 text-2xl font-bold text-neutral-900">
                  {selectedRestaurant.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRestaurant(null)}
                className="rounded-full bg-neutral-100 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-200"
              >
                關閉
              </button>
            </div>

            <div className="mt-5 flex h-48 items-center justify-center rounded-[24px] bg-neutral-100 text-5xl">
              🍜
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700">
                {selectedRestaurant.category}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  selectedRestaurant.isOpen
                    ? "bg-green-100 text-green-700"
                    : "bg-neutral-200 text-neutral-600"
                }`}
              >
                {selectedRestaurant.isOpen ? "營業中" : "已休息"}
              </span>
            </div>

            <div className="mt-5 rounded-2xl bg-emerald-50 px-4 py-4">
              <p className="text-sm font-medium text-emerald-800">推薦餐點</p>
              <p className="mt-1 text-xl font-bold text-emerald-900">
                {bestDish.name}
              </p>
              <p className="mt-1 text-sm text-emerald-700">
                健康度 {bestDish.health} · 熱門度 {bestDish.popularity} · 綜合分數{" "}
                {getDishScore(bestDish).toFixed(1)}
              </p>
              <p className="mt-2 text-sm leading-6 text-emerald-800">
                {bestDish.description}
              </p>
            </div>

            <div className="mt-5 space-y-3 text-sm text-neutral-600">
              <p>
                <span className="font-medium text-neutral-800">評分：</span>
                {selectedRestaurant.rating}
              </p>
              <p>
                <span className="font-medium text-neutral-800">距離：</span>
                步行 {selectedRestaurant.distanceMin} 分鐘
              </p>
              <p>
                <span className="font-medium text-neutral-800">地址：</span>
                {selectedRestaurant.address}
              </p>
              <p>
                <span className="font-medium text-neutral-800">營業時間：</span>
                {selectedRestaurant.hours}
              </p>
              <p className="leading-6">
                <span className="font-medium text-neutral-800">店家描述：</span>
                {selectedRestaurant.description}
              </p>
            </div>

            <div className="mt-5 rounded-2xl bg-neutral-50 px-4 py-3">
              <p className="text-sm leading-6 text-neutral-600">
                <span className="font-medium text-neutral-800">推薦原因：</span>
                {selectedRestaurant.reason}
              </p>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-sm font-medium text-neutral-900">其他店內品項</p>
              <div className="space-y-3">
                {selectedRestaurant.menu.map((item) => {
                  const isBest = item.name === bestDish.name
                  return (
                    <div
                      key={item.name}
                      className={`rounded-2xl border px-4 py-3 ${
                        isBest
                          ? "border-emerald-200 bg-emerald-50"
                          : "border-neutral-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-neutral-900">{item.name}</p>
                          <p className="mt-1 text-sm text-neutral-500">
                            健康度 {item.health} · 熱門度 {item.popularity}
                          </p>
                        </div>

                        {isBest && (
                          <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs text-white">
                            推薦
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm leading-6 text-neutral-600">
                        {item.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {selectedRestaurant.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}