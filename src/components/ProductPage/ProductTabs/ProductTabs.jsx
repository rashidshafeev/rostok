import React, { useState } from 'react'


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CharactersticsTab from './CharactersticsTab';
import FilesTab from './FilesTab';
import ReviewsTab from './ReviewsTab';
import InfoTab from './InfoTab';

function ProductTabs() {

    const [tabIndex, setTabIndex] = useState(0);


    return (
        <Tabs className="w-full" selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList className="w-full flex gap-[10px]">
                <Tab selectedClassName="bg-colLightGray" className="text-lg border-2 rounded-lg border-colLightGray flex justify-center items-center p-3 basis-[calc(25%-10px)] hover:bg-colLightGray">Характеристика и описание</Tab>
                <Tab selectedClassName="bg-colLightGray" className="text-lg border-2 rounded-lg border-colLightGray flex justify-center items-center p-3 basis-[calc(25%-10px)] hover:bg-colLightGray">Документы и сертификаты</Tab>
                <Tab selectedClassName="bg-colLightGray" className="text-lg border-2 rounded-lg border-colLightGray flex justify-center items-center p-3 basis-[calc(25%-10px)] hover:bg-colLightGray">Отзывы</Tab>
                <Tab selectedClassName="bg-colLightGray" className="text-lg border-2 rounded-lg border-colLightGray flex justify-center items-center p-3 basis-[calc(25%-10px)] hover:bg-colLightGray">Доставка и оплата</Tab>
            </TabList>

            <TabPanel>
                <CharactersticsTab />
            </TabPanel>

            <TabPanel>
                <FilesTab />
            </TabPanel>


            <TabPanel>
                <ReviewsTab></ReviewsTab>

            </TabPanel>
            <TabPanel>
                <InfoTab></InfoTab>
            </TabPanel>
        </Tabs>
    )
}

export default ProductTabs