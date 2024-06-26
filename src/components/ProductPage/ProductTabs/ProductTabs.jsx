import React, { useState } from 'react'


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CharactersticsTab from './CharactersticsTab';
import FilesTab from './FilesTab';
import ReviewsTab from './ReviewsTab';
import InfoTab from './InfoTab';

function ProductTabs({ current, group, tabIndex, setTabIndex }) {

    return (
        <Tabs id="char" className="w-full" selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList className="w-full flex gap-[10px]">
                <Tab selectedClassName="bg-colLightGray" className="cursor-pointer text-lg border-2 rounded-lg border-colLightGray flex justify-center items-center p-3 basis-[calc(25%-10px)] hover:bg-colLightGray">Характеристика и описание</Tab>
                <Tab selectedClassName="bg-colLightGray" className="cursor-pointer text-lg border-2 rounded-lg border-colLightGray flex justify-center items-center p-3 basis-[calc(25%-10px)] hover:bg-colLightGray">Документы и сертификаты</Tab>
                <Tab selectedClassName="bg-colLightGray" className="cursor-pointer text-lg border-2 rounded-lg border-colLightGray flex justify-center items-center p-3 basis-[calc(25%-10px)] hover:bg-colLightGray">Отзывы</Tab>
                <Tab selectedClassName="bg-colLightGray" className="cursor-pointer text-lg border-2 rounded-lg border-colLightGray flex justify-center items-center p-3 basis-[calc(25%-10px)] hover:bg-colLightGray">Доставка и оплата</Tab>
            </TabList>

            <TabPanel>
                <CharactersticsTab current={current} group={group}></CharactersticsTab>
            </TabPanel>

            <TabPanel>
                <FilesTab group={group}/>
            </TabPanel>


            <TabPanel>
                <ReviewsTab current={current} reviews={group.reviews} ></ReviewsTab>

            </TabPanel>
            <TabPanel>
                <InfoTab></InfoTab>
            </TabPanel>
        </Tabs>
    )
}

export default ProductTabs