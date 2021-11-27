import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #63c2D1;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
`;

export const SearchArea = styled.View`
    background-color: #4EADBE;
    height: 40px;
    border-radius: 30px;
    flex-direction: row;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 25px;
`;

export const SearchInput = styled.TextInput`
    flex: 1;
    margin: -5px;
    font-size: 14px;
    color: #FFFFFF;
    padding-top: 10px;
`;

export const ListArea = styled.View`
    margin-top: 30px;
    margin-bottom: 30px;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 18px;
    z-index: 9;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;