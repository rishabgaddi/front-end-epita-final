import React from 'react';
import InputBox from 'app/components/InputBox';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Address } from 'app/components/Address/Loadable';
import { getRoles } from 'services/role';
import { createUser, getUser, resetPassword } from 'services/auth';
import { createUserAccount } from 'services/user';
import { useNavigate } from 'react-router-dom';

export function CreateUser() {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    role: '',
  });
  const [gender, setGender] = React.useState('male');
  const [primaryAddress, setPrimaryAddress] = React.useState({
    street: '',
    city: '',
    area: '',
    country: '',
    zipCode: '',
  });
  const [secondaryAddress, setSecondaryAddress] = React.useState({
    street: '',
    city: '',
    area: '',
    country: '',
    zipCode: '',
  });
  const [roles, setRoles] = React.useState<string[]>([]);

  const onChangeHandler = (
    e: React.FormEvent<HTMLInputElement> | any,
  ): void => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onChangePrimaryAddress = (
    e: React.FormEvent<HTMLInputElement> | any,
  ) => {
    setPrimaryAddress({ ...primaryAddress, [e.target.name]: e.target.value });
  };

  const onChangeSecondaryAddress = (
    e: React.FormEvent<HTMLInputElement> | any,
  ) => {
    setSecondaryAddress({
      ...secondaryAddress,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Verify if userData is not empty
    if (
      userData.username !== '' ||
      userData.password !== '' ||
      userData.email !== '' ||
      userData.firstName !== '' ||
      userData.lastName !== '' ||
      userData.birthDate !== '' ||
      userData.role !== ''
    ) {
      try {
        // Create user for keycloak with LDAP
        const data = {
          username: userData.username,
          enabled: true,
          credentials: [
            {
              type: 'password',
              value: userData.password,
              temporary: false,
            },
          ],
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
        };
        if (userData.role === 'admin') {
          data['realmRoles'] = ['manage-users'];
        }
        await createUser(data);

        // Fetch the user id from keycloak
        const user = await getUser(userData.username);
        const userId = user[0].id;

        // Reset the password for the user
        // (Its because as of now keycloak does not set password properly while creating user)
        const resetPasswordData = {
          type: 'password',
          temporary: false,
          value: userData.password,
        };
        await resetPassword(userId, resetPasswordData);

        // Finally, create the user in the database
        const userDataToSave = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          username: userData.username,
          gender,
          role: userData.role,
          birthDate: userData.birthDate,
          primaryAddress: {
            street: primaryAddress.street,
            city: primaryAddress.city,
            area: primaryAddress.area,
            country: primaryAddress.country,
            number: primaryAddress.zipCode,
          },
          secondaryAddress: {
            street: secondaryAddress.street,
            city: secondaryAddress.city,
            area: secondaryAddress.area,
            country: secondaryAddress.country,
            number: secondaryAddress.zipCode,
          },
        };
        await createUserAccount(userDataToSave);
        navigate('/');
        alert('User created successfully');
      } catch (error) {
        alert(error);
      }
    } else {
      alert('Please fill all the fields');
    }
  };

  React.useEffect(() => {
    const fetchRoles = async () => {
      const data = await getRoles();
      setRoles(data.map((role: any) => role.name));
    };
    fetchRoles();
  }, []);

  return (
    <>
      <Helmet>
        <title>Create User</title>
        <meta name="description" content="Create User Page" />
      </Helmet>

      <Wrapper>
        <Text>Create User</Text>

        <Form onSubmit={onSubmitHandler}>
          <RadioButtons>
            {roles.map((role: string) => (
              <div key={role}>
                <RadioButton
                  type="radio"
                  name="role"
                  value={role}
                  // onChange={onChangeHandler}
                  onSelect={onChangeHandler}
                />
                <span>{role}</span>
              </div>
            ))}
          </RadioButtons>
          <InputBox
            name="username"
            type="text"
            placeholder="Enter username"
            value={userData.username}
            onChange={onChangeHandler}
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Enter password"
            value={userData.password}
            onChange={onChangeHandler}
          />
          <InputBox
            name="email"
            type="email"
            placeholder="Enter email"
            value={userData.email}
            onChange={onChangeHandler}
          />
          <InputBox
            name="firstName"
            type="text"
            placeholder="Enter first name"
            value={userData.firstName}
            onChange={onChangeHandler}
          />
          <InputBox
            name="lastName"
            type="text"
            placeholder="Enter last name"
            value={userData.lastName}
            onChange={onChangeHandler}
          />
          <Select value={gender} onChange={e => setGender(e.target.value)}>
            <Option value={'male'}>Male</Option>
            <Option value={'female'}>Female</Option>
          </Select>
          <InputBox
            name="birthDate"
            type="date"
            placeholder="Enter birth date"
            value={userData.birthDate}
            onChange={onChangeHandler}
          />
          <Address
            name="Primary Address"
            address={primaryAddress}
            onChangeHandler={onChangePrimaryAddress}
          />
          <Address
            name="Secondary Address"
            address={secondaryAddress}
            onChangeHandler={onChangeSecondaryAddress}
          />

          <Button>Create User</Button>
        </Form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.span`
  font-size: 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 300px;
  height: 40px;
  border: 3px solid silver;
  background-color: black;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

const Select = styled.select`
  width: 300px;
  height: 40px;
  border: 3px solid silver;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
`;

const Option = styled.option`
  width: 300px;
  height: 40px;
  border: 3px solid silver;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
`;

const RadioButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const RadioButton = styled.input`
  width: 20px;
  height: 20px;
  border: 3px solid silver;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
`;
