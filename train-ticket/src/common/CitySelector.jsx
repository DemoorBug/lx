import React, {
  useState,
  useMemo,
  useEffect,
  memo,
  useCallback
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './CitySelector.css'

// 搜索这里因为要起服务器，所以没有搞，到时候把起服务器的node代码放到public/文件夹下

const CityItem = memo(function CityItem(props) {
    const {
        name,
        onSelect,
    } = props;

    return (
        <li className="city-li" onClick={() => onSelect(name)}>
            { name }
        </li>
    );
});

CityItem.propTypes = {
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};

const CitySection = memo(function CitySection(props) {
    const {
        title,
        cities = [],
        onSelect,
    } = props;

    return (
        <ul className="city-ul" data-cate={title}>
            <li className="city-li" key="title">
                { title }
            </li>
            {
                cities.map((city, index) => {
                    return (
                        <CityItem
                            key={city.name}
                            name={city.name}
                            onSelect={onSelect}
                        />
                    );
                })
            }
        </ul>
    );
});


CitySection.propTypes = {
    title: PropTypes.string.isRequired,
    cities: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
};

const alphabet = Array.from(new Array(26), (eie, index) => {
  return String.fromCharCode(65 + index)
})

const AlphaIndex = memo(function AlphaIndex(props) {
  const {
    onClick,
    alpha
  } = props
  return (
    <div
      className="city-index-item"
      onClick={() => onClick(alpha)}
      >
      { alpha }
    </div>
  )
})

AlphaIndex.propTypes = {
  onClick: PropTypes.func.isRequired,
  alpha: PropTypes.string.isRequired
}

const CityList = memo(function CityList(props) {
    const {
        sections,
        onSelect,
        onClick
    } = props;
    console.log(sections);
    return (
        <div className="city-list">
            <div className="city-cate">
                {
                    sections.map(section => {
                        return (
                            <CitySection
                                key={section.title}
                                title={section.title}
                                cities={section.cities}
                                onSelect={onSelect}
                            />
                        );
                    })
                }
            </div>
            <div className="city-index">
              {
                alphabet.map(alpha => {
                  return (
                    <AlphaIndex
                      key={alpha}
                      alpha={alpha}
                      onClick={onClick}
                      />
                  )
                })
              }
            </div>
        </div>
    );
});

CityList.propTypes = {
    sections: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
};

const SuggestItem = memo(function SuggestItem(props) {
  const {
    name,
    onClick
  } = props;

  return (
    <li className="city-suggest-li" onClick={() => onClick(name)}>{name}</li>
  )
})

SuggestItem.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

const Suggest = memo(function Suggest(props) {
  const {
    searchKey,
    onSelect
  } = props

  const [result, setResult] = useState([])

  useEffect(() => {
    fetch('/rest/search?key=' + encodeURIComponent(searchKey))
      .then(res => res.json())
      .then(data => {
        const {
          result,
          searchKey: sKey
        } = data

        if (sKey === searchKey) {
          setResult(result)
        }
      })
  }, [searchKey])

  // 用useMemo优化
  // const fallBackResult = result.length ? result : [{
  //   display: searchKey
  // }]

  const fallBackResult = useMemo(() => {
    if (result.length) {
      return result
    } else {
      return [{
        display: searchKey
      }]
    }
  }, [result, searchKey])

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {
          fallBackResult.map(item => {
            return (
              <SuggestItem
                key={item.display}
                name={item.display}
                onClick={onSelect}
              />
            )
          })
        }
      </ul>
    </div>
  )
})

const CitySelector =  memo(function CitySelector(props) {
  const {
    show,
    cityData,
    isLoading,
    hideCitySelector,
    fetchCityData,
    onSelect
  } = props

  const [searchKey, setSearchKey] = useState('')

  const key = useMemo(() => searchKey.trim(), [searchKey])

  const onClick = useCallback(alpha => {
    document.querySelector(`[data-cate='${alpha}']`)
      .scrollIntoView()
  }, [])
  useEffect(() => {
    if (!show || cityData || isLoading) {
      return
    }

    fetchCityData()
  }, [show, cityData, isLoading, fetchCityData])

  const outputCitySections = () => {
      if (isLoading) {
          return <div>loading</div>;
      }

      if (cityData) {
          return (
              <CityList
                  sections={cityData.cityList}
                  onSelect={onSelect}
                  onClick={onClick}
              />
          );
      }

      return <div>error</div>;
  };

  return (
    <div className={classnames('city-selector', {hidden: !show})}>
      <div className="city-search">
        <div
          className="search-back"
          onClick={hideCitySelector}
          >
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
              />
          </svg>
        </div>
        <div className="search-input-wrapper">
            <input
                type="text"
                value={searchKey}
                className="search-input"
                placeholder="城市、车站的中文或拼音"
                onChange={e => setSearchKey(e.target.value)}
            />
        </div>
        <i
          className={classnames('search-clean', {
            hidden: key.length === 0
          })}
          onClick={() => setSearchKey('')}
        >
          &#xf063;
        </i>
      </div>
      {
        Boolean(key) && (
          <Suggest
            searchKey={key}
            onSelect={key => onSelect(key)}
          />
        )
      }
      { outputCitySections() }
    </div>
  )
})

CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  hideCitySelector: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default CitySelector
