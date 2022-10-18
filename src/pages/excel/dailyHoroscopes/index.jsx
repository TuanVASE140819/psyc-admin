import { getDailyHoroscopes } from '@/services/ant-design-pro/dailyHoroscope';
import { EditableProTable, ProCard, ProFormField, ProFormRadio } from '@ant-design/pro-components';
import React, { useState } from 'react';
const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export default () => {
    
    const [editableKeys, setEditableRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [position, setPosition] = useState('bottom');
    const columns = [
        // {
        //     "id": 1178,
        //     "imageUrl": "https://firebasestorage.googleapis.com/v0/b/psychologicalcounseling-28efa.appspot.com/o/zodiac%2Faries.png?alt=media&token=928fed58-c87c-4301-a55c-8e1a3ad53edd",
        //     "date": "2022-01-01T00:00:00",
        //     "context": "Ma Kết là một chòm sao tương đối âm thầm, hai ngôi sao sáng nhất trong chòm Ma Kết cũng chỉ rộng 3m. \nTừ phía chòm sao Ngưu Lang và Chức Nữ kéo dài hơn một bộ về phía Nam, \nsẽ có thể thấy được Sao β sáng nhất trong chòm sao Ma Kết",
        //     "job": "Bạn luôn cảm thấy bất an do mọi chuyện tưởng chừng như đơn giản nhưng thực tế lại vô cùng rắc rối, không thể tháo gỡ, nó xảy ra bất cứ lúc nào. Thậm chí là trong khoảng thời gian mà bạn không hề lường trước được. Bạn hãy suy nghĩ cận thân trước khi đưa ra quyết định",
        //     "affection": "Chuyên tình cảm của bạn không có nhiều biến động trong hôm nay.\nNgười đã có dôi vẫn ngọt ngào bên nữa kua, người cô đơn vẫn rất hài lòng với cuộc sống độc thân của mình",
        //     "luckyNumber": 1,
        //     "goodTime": "15:00",
        //     "color": "Đỏ, Vàng",
        //     "shouldThing": "Xem phim, Ăn uống",
        //     "shouldNotThing": "Ngồi một mình, Đi trễ",
        //     "zodiacId": 1
        //   }
        {
            title: 'Ngày',
            dataIndex: 'date',
            valueType: 'date',
            width:60,
            editable: false,
        },
        {
            title: 'Ảnh',
            dataIndex: 'imageUrl',
            valueType: 'image',
            width: 60,
            editable: false,
            imgProps: {
                width: 100,
                height: 100,
            },
        },
        {
            title: 'Số may mắn',
            dataIndex: 'luckyNumber',
            valueType: 'digit',
            width: 60,
            editable: false,
        },
        {
            title: 'Thời gian may mắn',
            dataIndex: 'goodTime',
            valueType: 'string',
            width: 60,
            editable: false,
        },
        {
            title: 'Màu sắc may mắn',
            dataIndex: 'color',
            valueType: 'text',
            width: 60,
            editable: false,
        },
        {
            title: 'Nên làm',
            dataIndex: 'shouldThing',
            valueType: 'text',
            width: 60,
            editable: false,
        },
        {
            title: 'Không nên làm',

            dataIndex: 'shouldNotThing',

            valueType: 'text',

            width: 70,

            editable: false,
            
        },
        {
            title: 'Tình cảm',
            dataIndex: 'affection',
            valueType: 'text',
            width: 120,
            editable: false,
        },
        {
            title: 'Công việc',
            dataIndex: 'job',
            valueType: 'text',

            width: 120,

            editable: false,
        },
        {
            title: 'Tổng quan',
            dataIndex: 'context',
            valueType: 'text',
            width: 120,
            editable: false,
        },


        
    ];
    const defaultData = [
        {
            "id": 1178,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/psychologicalcounseling-28efa.appspot.com/o/zodiac%2Faries.png?alt=media&token=928fed58-c87c-4301-a55c-8e1a3ad53edd",
            "date": "2022-01-01T00:00:00",
            "context": "Ma Kết là một chòm sao tương đối âm thầm, hai ngôi sao sáng nhất trong chòm Ma Kết cũng chỉ rộng 3m. \nTừ phía chòm sao Ngưu Lang và Chức Nữ kéo dài hơn một bộ về phía Nam, \nsẽ có thể thấy được Sao β sáng nhất trong chòm sao Ma Kết",
            "job": "Bạn luôn cảm thấy bất an do mọi chuyện tưởng chừng như đơn giản nhưng thực tế lại vô cùng rắc rối, không thể tháo gỡ, nó xảy ra bất cứ lúc nào. Thậm chí là trong khoảng thời gian mà bạn không hề lường trước được. Bạn hãy suy nghĩ cận thân trước khi đưa ra quyết định",
            "affection": "Chuyên tình cảm của bạn không có nhiều biến động trong hôm nay.\nNgười đã có dôi vẫn ngọt ngào bên nữa kua, người cô đơn vẫn rất hài lòng với cuộc sống độc thân của mình",
            "luckyNumber": 1,
            "goodTime": "15:00",
            "color": "Đỏ, Vàng",
            "shouldThing": "Xem phim, Ăn uống",
            "shouldNotThing": "Ngồi một mình, Đi trễ",
            "zodiacId": 1
          },
            {
            "id": 1179,
            
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/psychologicalcounseling-28efa.appspot.com/o/zodiac%2Ftaurus.png?alt=media&token=1b0b0b9b-1b8f-4b0f-8b1f-1f1f1f1f1f1f",
            "date": "2022-01-01T00:00:00",
            "context": "Ma Kết là một chòm sao tương đối âm thầm, hai ngôi sao sáng nhất trong chòm Ma Kết cũng chỉ rộng 3m. \nTừ phía chòm sao Ngưu Lang và Chức Nữ kéo dài hơn một bộ về phía Nam, \nsẽ có thể thấy được Sao β sáng nhất trong chòm sao Ma Kết",
            "job": "Bạn luôn cảm thấy bất an do mọi chuyện tưởng chừng như đơn giản nhưng thực tế lại vô cùng rắc rối, không thể tháo gỡ, nó xảy ra bất cứ lúc nào. Thậm chí là trong khoảng thời gian mà bạn không hề lường trước được. Bạn hãy suy nghĩ cận thân trước khi đưa ra quyết định",
            "affection": "Chuyên tình cảm của bạn không có nhiều biến động trong hôm nay.\nNgười đã có dôi vẫn ngọt ngào bên nữa kua, người cô đơn vẫn rất hài lòng với cuộc sống độc thân của mình",
            "luckyNumber": 1,
            "goodTime": "15:00",
            "color": "Đỏ, Vàng",
            "shouldThing": "Xem phim, Ăn uống",
            "shouldNotThing": "Ngồi một mình, Đi trễ",
            "zodiacId": 1
            },
    ];
    


  
    return (<>
      <EditableProTable 

      rowKey="id"
       headerTitle="Thông tin lá phiếu tử vi"
        maxLength={5}
         scroll={{
            x: 960,
        }}
        
        recordCreatorProps=
        //{position !== 'hidden'
            // ? {
            //     position: position,
            //     record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
            // }
            // : false}
        {{
            position: 'hidden',
            record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
            lang: "en",
            creatorButtonText: "thêm dòng",
             mesage: "thêm dòng",
        }}

        loading={false} toolBarRender={() => [
        ]} columns={columns} request={async () => ({
            data: defaultData,   
            total: 3,
            success: true,
        })} 
        editable={{
            type: 'multiple',
            editableKeys,
            onChange: setEditableRowKeys,
            actionRender: (row, config, defaultDoms) => [
                <a

                    key="editable"

                    onClick={() => {
                         
                        setEditableRowKeys((keys) => keys.filter((item) => item !== row.id));
                    }}

                >

                    Save

                </a>,
                defaultDoms.delete,
            ],
            onSave: async (key, row) => {
                await waitTime(2000);
                console.log(key, row);
            },
            onDelete: async (key) => {
                await waitTime(2000);
                console.log(key);
            },
        }}/>
    </>);
};
