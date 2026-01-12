import { Children, isValidElement, useContext, useState } from 'react';
import { ApplicationContext } from '../../core/providers.js';
import { TabContentContainer, TabsContainer, TabsWrapper } from './style';
import { TabButton } from './tabButton.js';

export function Tabs({ children }) {
    const { state, dispatch } = useContext(ApplicationContext)

    const tabs = Children.toArray(children).filter(isValidElement);
    const [activeIndex, setActiveIndex] = useState(0);

    const activeTab = tabs[activeIndex];

    return (
        <TabsContainer>
            <TabsWrapper>
                {tabs.map((tab, index) => (
                    <TabButton
                        key={tab.props.id}
                        label={tab.props.label}
                        active={index === activeIndex}
                        onClick={() => {
                            dispatch({ ...state, selectedTool: tab.props.id, });
                            setActiveIndex(index);
                        }}
                    />
                ))}
            </TabsWrapper>

            <TabContentContainer>
                {activeTab}
            </TabContentContainer>
        </TabsContainer>
    );
}
